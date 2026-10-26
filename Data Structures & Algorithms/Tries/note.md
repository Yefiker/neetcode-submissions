Trie (Prefix Tree) Study Notes

A Trie is a specialized tree data structure optimized for storing and retrieving keys in a dataset of strings. Instead of storing an entire word in a single node, strings are saved character by character down a path of connected nodes.

Key Properties

• Prefix Sharing: Words that share common starting characters (like "car", "cart", and "cat") share the exact same structural nodes for their shared prefix (c -> a). This offers massive space efficiency for similar datasets.
• Instant Lookups: Searching for a string or prefix of length L takes exactly \(\mathcal{O}(L)\) time. The lookup speed is completely independent of whether your Trie contains 10 words or 10 million words.
• Core Application Fields: Autocomplete search predictions, spell checkers, dictionary lookups, and IP routing tables.

Architectural Pattern

To avoid a circular memory loop or a stack overflow error, you must always separate the architecture into two distinct layers:

1. TrieNode (The Component): A lightweight container class that only represents a single character position. It holds an object/map of children and a boolean marker isEndOfWord.
2. PrefixTree (The Manager): The overarching class that manages insertions and lookups, initializing with a single placeholder empty root node.
