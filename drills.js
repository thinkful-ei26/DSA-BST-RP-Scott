

// DRAW a BST
//  3
//  /\
// 1    4
//  \     \
//   2      6
//         /  \
//        5     9
//             /
//           7


//Remove the Root

//   2
//   /\
// 1    4
//        \
//          6
//         /  \
//        5     9
//             /
//           7

//Create a BST class

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child,
      //then you replace the node with its left child.
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  find(key) {
  //if the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    //if the item you are looking for is less than the root
    //then follow the left child
    //if there is an existing left child,
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root
    //then follow the right child
    //if there is an existing right child,
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
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
  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }




}

const height = tree => {
  if(!tree){
    return 0;
  }
  const left = height(tree.left);
  const right = height(tree.right);

  return Math.max(left, right) +1;
};


const isBST = (tree) => {
  //const root = tree.key;
  if (!tree) {
    return false;
  }

  if (!tree.left && !tree.right) {
    console.log("189");
    return true;
  }

  // if (tree.right) {
  //   if (root < tree.right.key){
  //     console.log("tree.key", tree.key);
  //     console.log("tree.key.right", tree.right.key);
  //     return isBST(tree.right);
  //   } else {
  //     return false;
  //   }
  // }
  //
  // if (tree.left) {
  //   if (root > tree.left.key){
  //     console.log("tree.key is ", tree.key);
  //     console.log("left");
  //     return isBST(tree.left);
  //
  //   }else{
  //     return false;
  //   }
  // }
  //console.log(tree.right);
  if (tree.right < tree.left){
    console.log("right", tree.right);
    return false;
  }else if(tree.left > tree.key){
    console.log("left", tree.left);
    return false;
  }else{
    if (tree.left){
      console.log("left key", tree.left.key, tree.key);
    }
    if (tree.right){
      console.log("right key", tree.right.key, tree.key);
    }
    isBST(tree.left);
    isBST(tree.right);
  }
  return true;
};


const BST = new BinarySearchTree();


function main() {
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  // console.log(BST);
}

main();
console.log(isBST(BST));
