import { NodeOptions } from "vis-network";

/**
 * Taxonomy data and the attribute whose type is this taxonomy
 */
export type TaxonomyData = {
  onAttribute: string;
  nodes: Array<TaxonomyNode>;
  edges: Array<TaxonomyEdge>;
};

/**
 * Datatype for a taxonomy node
 */
export interface TaxonomyNode extends Partial<NodeOptions> {
  id: number;
  label: string;
  parentId: number;
  weight: number;
  depth: number;
}

/**
 * Datatype for a taxonomy edge
 */
export type TaxonomyEdge = {
  id: number;
  from: number;
  to: number;
  label?: string;
};

/**
 * A class that represents a Taxonomy. It provides methods to find nodes by label or by id.
 * Additionally, it computes the Lowest Common Ancestor for two nodes
 */
export class Taxonomy {
  private data: TaxonomyData;
  constructor(taxonomy: TaxonomyData) {
    this.data = taxonomy;
  }

  /**
   * Gets a list of taxonomy nodes
   * @returns The nodes in the taxonomy
   */
  getNodes(): Array<TaxonomyNode> {
    return this.data.nodes;
  }

  /**
   * Gets a list of taxonomy edges
   * @returns The edges in the taxonomy
   */
  getEdges(): Array<TaxonomyEdge> {
    return this.data.edges;
  }

  /**
   * Find the first node with a specific label
   * @param label node label
   * @returns A copy of the taxonomy node with the label; or undefined, if it does not exist
   */
  findNodeByLabel(label: string): TaxonomyNode | undefined {
    let node = this.data.nodes.find((el) => el.label == label);
    if (node) {
      node = JSON.parse(JSON.stringify(node));
    }
    return node;
  }
  /**
   * Find the node with a specific id
   * @param id node id
   * @returns A copy of the taxonomy node with the id; or undefined, if it does not exist
   */
  findNodeById(id: number): TaxonomyNode | undefined {
    let node = this.data.nodes.find((el) => el.id == id);
    if (node) {
      node = JSON.parse(JSON.stringify(node));
    }
    return node;
  }

  /**
   * Compute the lowest common ancestor for two nodes identified by their labels
   * @param c1Label Label of the first node
   * @param c2Label Label of the second node
   * @returns A copy of the lowest common ancestor of the nodes; or null, if any input node does not exist
   */
  findLCA(c1Label: string, c2Label: string): TaxonomyNode | null {
    let node1 = this.findNodeByLabel(c1Label);
    let node2 = this.findNodeByLabel(c2Label);
    if (node1 && node2) {
      while (node1.id != node2.id) {
        if (node1.parentId == -1) {
          return node1;
        }
        if (node2.parentId == -1) {
          return node2;
        }
        if (node1.depth > node2.depth) {
          let parentNode = this.findNodeById(node1?.parentId);
          if (parentNode) {
            node1 = parentNode;
          } else {
            return null;
          }
        } else {
          let parentNode = this.findNodeById(node2?.parentId);
          if (parentNode) {
            node2 = parentNode;
          } else {
            return null;
          }
        }
      }
      return JSON.parse(JSON.stringify(node1));
    } else return null;
  }
}
