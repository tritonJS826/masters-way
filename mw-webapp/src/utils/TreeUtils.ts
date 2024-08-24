/**
 * Tree node structure
 */
interface TreeNode<T> {

    /**
     * Children
     */
    children?: TreeNode<T>[];
}

/**
 * Utils for tree structures
 */
export class TreeUtils {

  /**
   * Execute callback for each element in tree
   */
  public static forEach<T extends TreeNode<T>>(node: T, callback: (node: T) => void): void {
    callback(node);

    if (node.children) {
      node.children.forEach(child => this.forEach(child as T, callback));
    }
  }

  /**
   * Make a flat array of nodes
   */
  public static flattenTree<T extends TreeNode<T>>(root: T): T[] {
    const result: T[] = [];

    /**
     * Helper for flatten tree
     */
    function traverse(node: TreeNode<T>) {
      result.push(node as T);
      if (node.children) {
        node.children.forEach(traverse);
      }
    }

    traverse(root);

    return result;
  }

}
