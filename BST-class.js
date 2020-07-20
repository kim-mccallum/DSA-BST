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
  find(key) {
    //   if the item is at the root, return
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
      return this.right.find(key);
    } else {
      /* You have searched the tree and the item is not found */
      throw new Error("Key error");
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child, 
           then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
           then you replace it with its right child */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children then
           simply remove it and any references to it 
           by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

module.exports = {
  BinarySearchTree,
};
