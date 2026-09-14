You are given an array of `N` elements and `Q` queries. Each query asks for an aggregate value, such as the sum or minimum, over a range `[l, r]`.

For example, a range-minimum query asks for the smallest value in every given range.

## Brute Force Approach

For every query, iterate from `l` to `r` and calculate the answer. A single query takes `O(N)` in the worst case, so `Q` queries take `O(NQ)`.

## Segment Tree

A segment tree is a binary tree in which every node stores the answer for one contiguous range:

- The root represents `[0, N - 1]`.
- A leaf represents one array element.
- Every internal node splits its range at `mid` and combines the answers of its two children.

![[Drawing 2023-09-13 15.28.51.excalidraw]]

Segment trees are commonly stored in an array instead of using node pointers:

```cpp
vector<long long> tree(4 * N);
```

`4N` is a convenient upper bound on the required storage. For a zero-indexed tree array:

```text
leftChild  = 2 * node + 1
rightChild = 2 * node + 2
```

The examples below use **range-sum queries**. For another operation, change the merge operation and its identity value:

| Operation | Merge | Identity for no overlap |
|---|---|---|
| Sum | `left + right` | `0` |
| Minimum | `min(left, right)` | `LLONG_MAX` |
| Maximum | `max(left, right)` | `LLONG_MIN` |
| GCD | `gcd(left, right)` | `0` |

The operation must be associative, so grouping ranges in different ways does not change the answer.

### Building the Tree

At a leaf, store the corresponding array value. At an internal node, recursively build both children and merge their answers.

```cpp
void build(int node, int start, int end, const vector<int>& arr) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }

    int mid = start + (end - start) / 2;
    build(2 * node + 1, start, mid, arr);
    build(2 * node + 2, mid + 1, end, arr);

    tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
}
```

Building visits every node once, so it takes `O(N)` time.

### Calculating Range Queries

Given a query range `[left, right]`, start at the root and handle three cases:

1. **No overlap:** The current segment is completely outside the query. Return the identity value.
2. **Full overlap:** The current segment is completely inside the query. Return its stored answer.
3. **Partial overlap:** Query both children and merge their answers.

```cpp
long long query(int node, int start, int end, int left, int right) {
    // No overlap
    if (right < start || end < left) {
        return 0;
    }

    // Full overlap
    if (left <= start && end <= right) {
        return tree[node];
    }

    // Partial overlap
    int mid = start + (end - start) / 2;
    long long leftAnswer =
        query(2 * node + 1, start, mid, left, right);
    long long rightAnswer =
        query(2 * node + 2, mid + 1, end, left, right);

    return leftAnswer + rightAnswer;
}
```

A query visits `O(log N)` relevant tree levels and takes `O(log N)` time.

## Point Updates in Segment Trees

A point update changes one array element, for example `arr[index] = value`. Rebuilding the entire tree would take `O(N)`, but only the leaf for `index` and its ancestors need to change.

1. Start at the root.
2. Recurse into the child whose range contains `index`.
3. At the leaf, store the new value.
4. While returning, recompute every ancestor from its children.

```cpp
void update(int node, int start, int end, int index, int value) {
    if (start == end) {
        tree[node] = value;
        return;
    }

    int mid = start + (end - start) / 2;

    if (index <= mid) {
        update(2 * node + 1, start, mid, index, value);
    } else {
        update(2 * node + 2, mid + 1, end, index, value);
    }

    tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
}
```

Only one root-to-leaf path is visited, so a point update takes `O(log N)`.

### Complete Point-Update Segment Tree

The public methods below assume that the input array is non-empty and all indices are valid.

```cpp
class SegmentTree {
private:
    int n;
    vector<long long> tree;

    void build(int node, int start, int end, const vector<int>& arr) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }

        int mid = start + (end - start) / 2;
        build(2 * node + 1, start, mid, arr);
        build(2 * node + 2, mid + 1, end, arr);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    long long query(int node, int start, int end, int left, int right) {
        if (right < start || end < left) {
            return 0;
        }
        if (left <= start && end <= right) {
            return tree[node];
        }

        int mid = start + (end - start) / 2;
        return query(2 * node + 1, start, mid, left, right)
             + query(2 * node + 2, mid + 1, end, left, right);
    }

    void update(int node, int start, int end, int index, int value) {
        if (start == end) {
            tree[node] = value;
            return;
        }

        int mid = start + (end - start) / 2;
        if (index <= mid) {
            update(2 * node + 1, start, mid, index, value);
        } else {
            update(2 * node + 2, mid + 1, end, index, value);
        }

        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

public:
    explicit SegmentTree(const vector<int>& arr) {
        n = arr.size();
        tree.assign(4 * n, 0);
        build(0, 0, n - 1, arr);
    }

    long long query(int left, int right) {
        return query(0, 0, n - 1, left, right);
    }

    void update(int index, int value) {
        update(0, 0, n - 1, index, value);
    }
};
```

## Lazy Propagation

Suppose an update adds `value` to **every element** in `[left, right]`. Calling a point update for each element takes `O(N log N)` in the worst case.

Lazy propagation makes both range updates and range queries `O(log N)` by postponing work:

- `tree[node]` always contains the correct answer for the node's entire segment.
- `lazy[node]` stores an update that has already been applied to this node but still needs to be passed to its children.
- Before descending from a node, `push` sends its pending update to its children.

For a range-sum tree, adding `value` to a segment `[start, end]` increases its sum by:

```text
(end - start + 1) * value
```

### Applying and Pushing Pending Updates

```cpp
void apply(int node, int start, int end, long long value) {
    tree[node] += (end - start + 1) * value;
    lazy[node] += value;
}

void push(int node, int start, int end) {
    if (lazy[node] == 0 || start == end) {
        return;
    }

    int mid = start + (end - start) / 2;
    apply(2 * node + 1, start, mid, lazy[node]);
    apply(2 * node + 2, mid + 1, end, lazy[node]);
    lazy[node] = 0;
}
```

`apply` updates the current node immediately and records what its children are still owed. Multiple range-add updates compose by addition, which is why `lazy[node] += value` is used.

### Range Update

The overlap cases are the same as for a query:

- **No overlap:** Do nothing.
- **Full overlap:** Apply the update to the current node and stop descending.
- **Partial overlap:** Push pending work, update both children, and merge them.

```cpp
void rangeAdd(
    int node, int start, int end,
    int left, int right, long long value
) {
    if (right < start || end < left) {
        return;
    }

    if (left <= start && end <= right) {
        apply(node, start, end, value);
        return;
    }

    push(node, start, end);

    int mid = start + (end - start) / 2;
    rangeAdd(2 * node + 1, start, mid, left, right, value);
    rangeAdd(2 * node + 2, mid + 1, end, left, right, value);

    tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
}
```

### Range Query with Lazy Propagation

Push before descending so each child contains all updates that affect it.

```cpp
long long query(int node, int start, int end, int left, int right) {
    if (right < start || end < left) {
        return 0;
    }

    if (left <= start && end <= right) {
        return tree[node];
    }

    push(node, start, end);

    int mid = start + (end - start) / 2;
    return query(2 * node + 1, start, mid, left, right)
         + query(2 * node + 2, mid + 1, end, left, right);
}
```

### Complete Lazy Segment Tree

This implementation supports:

- `rangeAdd(left, right, value)`: add `value` to every element in `[left, right]`
- `query(left, right)`: calculate the sum of `[left, right]`

It assumes that the input array is non-empty and all query/update ranges are valid.

```cpp
class LazySegmentTree {
private:
    int n;
    vector<long long> tree;
    vector<long long> lazy;

    void build(int node, int start, int end, const vector<int>& arr) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }

        int mid = start + (end - start) / 2;
        build(2 * node + 1, start, mid, arr);
        build(2 * node + 2, mid + 1, end, arr);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    void apply(int node, int start, int end, long long value) {
        tree[node] += (end - start + 1) * value;
        lazy[node] += value;
    }

    void push(int node, int start, int end) {
        if (lazy[node] == 0 || start == end) {
            return;
        }

        int mid = start + (end - start) / 2;
        apply(2 * node + 1, start, mid, lazy[node]);
        apply(2 * node + 2, mid + 1, end, lazy[node]);
        lazy[node] = 0;
    }

    void rangeAdd(
        int node, int start, int end,
        int left, int right, long long value
    ) {
        if (right < start || end < left) {
            return;
        }

        if (left <= start && end <= right) {
            apply(node, start, end, value);
            return;
        }

        push(node, start, end);

        int mid = start + (end - start) / 2;
        rangeAdd(2 * node + 1, start, mid, left, right, value);
        rangeAdd(2 * node + 2, mid + 1, end, left, right, value);
        tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
    }

    long long query(int node, int start, int end, int left, int right) {
        if (right < start || end < left) {
            return 0;
        }

        if (left <= start && end <= right) {
            return tree[node];
        }

        push(node, start, end);

        int mid = start + (end - start) / 2;
        return query(2 * node + 1, start, mid, left, right)
             + query(2 * node + 2, mid + 1, end, left, right);
    }

public:
    explicit LazySegmentTree(const vector<int>& arr) {
        n = arr.size();
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        build(0, 0, n - 1, arr);
    }

    void rangeAdd(int left, int right, long long value) {
        rangeAdd(0, 0, n - 1, left, right, value);
    }

    long long query(int left, int right) {
        return query(0, 0, n - 1, left, right);
    }
};
```

### Important Lazy-Propagation Details

- The meaning of `lazy[node]` depends on the update type. Here it means "add this value to every element in the segment."
- The way a lazy value changes `tree[node]` depends on the query type. Range-add changes a sum by `length * value`, but changes a minimum by only `value`.
- Range assignment needs different composition rules from range addition. An assignment usually requires a separate flag because assigning `0` is still a real pending update.
- Push pending updates before descending into children.
- After updating children, recompute the current node from them.

## Complexity

| Operation | Time | Extra space |
|---|---:|---:|
| Build | `O(N)` | `O(N)` |
| Range query | `O(log N)` | `O(log N)` recursion stack |
| Point update | `O(log N)` | `O(log N)` recursion stack |
| Lazy range update | `O(log N)` | `O(log N)` recursion stack |

Without lazy propagation, a range update may take `O(N log N)` if implemented as many point updates.
