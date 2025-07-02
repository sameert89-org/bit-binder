Tries are k-ary trees used for searching keys optimally, they are also known as radix trees/prefix trees.
**_re-trie-val_**
## Implementation
Below is a Trie implementation for the english words. This is slightly different from trees for effective implementation(It has no value in itself, the alphabet added is determined by its children). Each node (block of memory) has one ore more of the 26 alphabets. And a mark attribute, that marks if a word ends at this node. So position 3 is not None, it will have a pointer to the next node of the Trie.
![[Drawing 2023-08-30 13.26.36.excalidraw]]

```python
class TrieNode:
	def __init__(self):
		self.children = {}
		self.eow = False  # end of word?
class Trie:
	def __init__(self):
		self.root = TrieNode()
	def insert(self, key):
		N = len(key)
		trav = self.root
		for ch in key:
			if ch not in trav.children:
				trav.children[ch] = TrieNode()
			trav = trav.children[ch]
		trav.eow = True
	def search(self, key):
		N = len(key)
		trav = self.root
		for i, ch in enumerate(key):
			if ch not in trav.children:
				return False
			trav = trav.children[ch]
		return trav.eow
```

|Operation|Time Complexity|Auxiliary Space|
|---|---|---|
|Insertion|O(n)|O(n\*m)|
|Searching|O(n)|O(1)|