import { NodeOptions } from "vis-network";

export class Taxonomy {
    private data:TaxonomyData;
    constructor(taxonomy: TaxonomyData){
        this.data = taxonomy;
    }

    getNodes(){
        return this.data.nodes;
    }

    getEdges(){
        return this.data.edges;
    }

    findNodeByLabel(label: string): TaxonomyNode | undefined {
        return this.data.nodes.find((el) => el.label == label);
    }

    findNodeById(id: number): TaxonomyNode | undefined {
        return this.data.nodes.find((el) => el.id == id);
    }

    findLCA (c1Label:string, c2Label:string):TaxonomyNode | null {
        let node1 = this.findNodeByLabel(c1Label);
        let node2 = this.findNodeByLabel(c2Label);
        if (node1 && node2) {
            while (node1 != node2) {
                if (node1.parent == -1) {
                    return node1;
                }
                if (node2.parent == -1) {
                    return node2;
                }
                if (node1.depth > node2.depth) {
                    let parentNode = this.findNodeById(node1?.parent);
                    if (parentNode){
                        node1 = parentNode;
                    } else {
                        return null;
                    }
                } else {
                    let parentNode = this.findNodeById(node2?.parent);
                    if (parentNode) {
                        node2 = parentNode;
                    } else {
                        return null;
                    }
                }
            }
            return node1;
        } else return null;
    } 
}

export type TaxonomyData = {
    onAttribute: string;
    nodes: Array<TaxonomyNode>;
    edges: Array<TaxonomyEdge>;
}


export interface TaxonomyNode extends Partial<NodeOptions> {
    id: number,
    label: string,
    parent: number,
    weight: number,
    depth: number
}

export type TaxonomyEdge = {
    id: number;
    from: number;
    to: number;
}