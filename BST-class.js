class BinarySearchTree {
  constructor(key = null, value = null, parent = null, child = null) {
    // if key is null, it's an empty tree
    this.key = key;
    this.value = value;
    // if parent is null, it is a root node
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  //   insert - recursive
  insert(key, value) {
    // if the key is empty then the key being inserted is going to be the root
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    // If the tree already exists, start at the root, and compare it to the new key you
    // want to insert. If the new key is less than the node's key, then the new key needs
    // to live on the LH branch.
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      // if the node has an existing LF child, we recursively call the insert method.
      // so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    // Similarly, if the new key is greater than the node's key, then you do the same
    // thing but on the RH side
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
}
