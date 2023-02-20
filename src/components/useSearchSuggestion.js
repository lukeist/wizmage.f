class TrieNode {
  constructor() {
    this.children = new Array(26);
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  insert(word) {
    let a = this.alphabet;
    let r = this.root;
    for (let w of word) {
      let i = a.indexOf(w);
      if (!r.children[i]) r.children[i] = new TrieNode();
      r = r.children[i];
    }
    r.isWord = true;
  }

  getWordsStartWith(prefix) {
    let a = this.alphabet;
    let r = this.root;
    const result = [];
    for (let c of prefix) {
      let i = a.indexOf(c);
      if (!r.children[i]) return result;
      r = r.children[i];
    }
    this.dfs(prefix, r, result);
    return result;
  }

  dfs(prefix, r, result) {
    if (result.length === 5) return; // 5 suggestions/search
    r.isWord && result.push(prefix);
    let a = this.alphabet;
    for (let i = 0; i < r.children.length; i++) {
      r.children[i] && this.dfs(prefix + a[i], r.children[i], result);
    }
  }
}

// first run
const useSearchSuggestion = (words, searchWord) => {
  const trie = new Trie();
  for (let w of words) {
    trie.insert(w);
  }
  const results = [];
  let prefix = "";
  for (let c of searchWord) {
    prefix += c;
    results.push(trie.getWordsStartWith(prefix));
  }
  return results;
};
