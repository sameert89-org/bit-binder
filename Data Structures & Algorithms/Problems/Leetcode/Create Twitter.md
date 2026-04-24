#needcode150 #heaps 
This is a class design problem, the only complexity lies in the `newsFeed` part. You can maintain an array of all tweets and then do a lookup based on user id and their following but that is too slow.

The idea is to use a `minHeap`.

> [!TIP] Ask Min Take Max, Ask Max Take Min
> For problems involving heaps, whenever you are asked `k` smallest elements, a max heap of  k elements can be used and vice-versa.

Pushing every tweet from user and their followers in a minHeap of size 10 works for this problem but its too slow `O(T)log10`, the core idea is figuring out how to push the data to the heap.

- Push the latest tweets from *user* and their *followers*. 
- Pop the latest tweet out of those.
- Push the previous tweet from that user in the heap.

```cpp
class User {
public:
    unordered_set<int> following;
    vector<pair<int, int>> tweets; // {time, tweetId}
};

class Twitter {
public:
    int time = 0;
    unordered_map<int, User*> users;

    void createUserIfNotExists(int userId) {
        if (!users.contains(userId)) {
            users[userId] = new User();
            users[userId]->following.insert(userId);
        }
    }

    Twitter() {}

    void postTweet(int userId, int tweetId) {
        createUserIfNotExists(userId);
        users[userId]->tweets.push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        createUserIfNotExists(userId);

        struct Node {
            int time;
            int tweetId;
            int userId;
            int idx; // index in that user's tweets array
        };

        struct Compare {
            bool operator()(const Node& a, const Node& b) const {
                return a.time < b.time; // max-heap by time
            }
        };

        priority_queue<Node, vector<Node>, Compare> pq;

        for (int followeeId : users[userId]->following) {
            auto& tweets = users[followeeId]->tweets;
            if (!tweets.empty()) {
                int idx = (int)tweets.size() - 1;
                pq.push({tweets[idx].first, tweets[idx].second, followeeId, idx});
            }
        }

        vector<int> feed;
        while (!pq.empty() && feed.size() < 10) {
            Node top = pq.top();
            pq.pop();

            feed.push_back(top.tweetId);

            if (top.idx > 0) {
                int prevIdx = top.idx - 1;
                auto& tweets = users[top.userId]->tweets;
                pq.push({tweets[prevIdx].first, tweets[prevIdx].second, top.userId, prevIdx});
            }
        }

        return feed;
    }

    void follow(int followerId, int followeeId) {
        createUserIfNotExists(followerId);
        createUserIfNotExists(followeeId);
        users[followerId]->following.insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        createUserIfNotExists(followerId);
        createUserIfNotExists(followeeId);
        if (followerId == followeeId) return;
        users[followerId]->following.erase(followeeId);
    }

    ~Twitter() {
        for (auto& [id, user] : users) {
            delete user;
        }
    }
};
```