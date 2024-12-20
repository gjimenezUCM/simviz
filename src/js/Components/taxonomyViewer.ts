import { Taxonomy, TaxonomyEdge, TaxonomyNode } from "../types/taxonomy";
import vis, { Network } from 'vis-network';


type VisTaxonomyData = {
    nodes: Array<TaxonomyNode>,
    edges: Array<TaxonomyEdge>,
};

const DEFAULT_VIS_OPTIONS:vis.Options = {
    edges: {
        color: {
            inherit: false
        }
    },
    nodes: {
        shape: "dot",
        font:{
            multi: "html",
            size: 14,
            face: "Roboto",
            color: "black"
        },
        borderWidth: 3,
        color: "#F5F5F7"
    },
    groups:{
        lca: {
            shape: "triangleDown",
            color: "#F95454"
        },
        leftItem: {
            shape: "square",
            color: "#77CDFF"
        },
        rightItem:{
            shape: "diamond",
            color: "#FFE700"           
        }
    },
    layout: {

        hierarchical: {
            direction: "UD",
            sortMethod: "directed",
            shakeTowards: "roots"
        },
    },
    interaction: {
        zoomView: true,
    }

};

/**
 * The `TaxonomyViewer` class is responsible for visualizing a taxonomy using the vis-network library.
 * It initializes and manages two taxonomy visualizations: one for the entire taxonomy and one for a detailed view of a subtree.
 */
export class TaxonomyViewer {
    private theTaxonomy: Taxonomy;
    private taxonomyContainerNode: HTMLElement | null;
    private detailContainerNode: HTMLElement | null;
    private taxonomyGraph: Network | null;
    private detailGraph: Network | null;
    private taxonomyVisData: vis.Data | null;

    /**
     * Constructor
     */
    constructor() {
        this.taxonomyContainerNode = document.getElementById("the-taxonomy");
        this.detailContainerNode = document.getElementById("detail-taxonomy");
        this.taxonomyGraph = null;
        this.detailGraph = null;
    }

    /**
     * Initializes the taxonomy viewer with the given taxonomy.     *
     * @param aTaxonomy - The taxonomy to be visualized.
     */
    init(aTaxonomy: Taxonomy) {
        this.theTaxonomy = aTaxonomy;

        this.taxonomyVisData = {
            nodes: aTaxonomy.getNodes(),
            edges: aTaxonomy.getEdges(),
        };
        if (this.taxonomyContainerNode) {
            let data: VisTaxonomyData = JSON.parse(JSON.stringify(this.taxonomyVisData));
            this.taxonomyGraph = new vis.Network(this.taxonomyContainerNode, data, DEFAULT_VIS_OPTIONS);
        }

    }

    /**
     * Updates the subtree visualization of two cases identified by their taxonomy labels.
     * Case ids are also employed to show them on hover
     * The node root of the subtree will be the lowest common ancestor (LCA) of these nodes.
     * 
     * @param leftCaseLabel - The taxonomy label of the left item.
     * @param leftCaseId - The identifier of the left item.
     * @param rightCaseLabel - The taxonomy label of the right item.
     * @param rightCaseId - The identifier of the right item.
     */
    updateSubTree(leftCaseLabel: string, leftCaseId: string, rightCaseLabel: string, rightCaseId:string, similarityValue: number = 0.0){
        if (this.detailContainerNode){
            let data = this.createSubtree(leftCaseLabel, rightCaseLabel);
            if (data) {
                let lcaNode = this.theTaxonomy.findLCA(leftCaseLabel, rightCaseLabel);
                let lcaId = lcaNode?.id || 0;

                let lcaIndex = data.nodes.findIndex(e => e.id === lcaId);
                if (lcaIndex !== -1) {
                    data.nodes[lcaIndex]["group"] = "lca";
                    data.nodes[lcaIndex]["label"] = `${data.nodes[lcaIndex]["label"]}\n <b>${String(similarityValue.toFixed(3))}</b>`;
                    data.nodes[0]["group"] = "leftItem";
                    data.nodes[0]["title"] = leftCaseId;
                    data.nodes[1]["group"] = "rightItem";
                    data.nodes[1]["title"] = rightCaseId;

                    let options = JSON.parse(JSON.stringify(DEFAULT_VIS_OPTIONS)); ;
                    if (leftCaseLabel === rightCaseLabel) {
                        // When both cases have the same taxonomical value, then modify the default options
                        options.layout.hierarchical.direction = "LR";
                        options.edges.dashes = true;
                    }
                    options["interaction"] = {
                        hover: true,
                        zoomView: false,
                    }
                    this.detailGraph = new vis.Network(this.detailContainerNode, data, options);
                    this.detailGraph.on("selectNode", (eventData) => {
                        if (this.taxonomyGraph) {
                            let f: vis.EasingFunction = 'easeInOutQuad'
                            let moveOptions = {
                                scale: 1.0,
                                offset: { x: 0.0, y: 0.0 },
                                animation: {
                                    duration: 1000,
                                    easingFunction: f
                                }
                            };
                            this.taxonomyGraph.focus(eventData.nodes[0], moveOptions);
                            this.taxonomyGraph.selectNodes([eventData.nodes[0]])
                        }

                    });
                    this.highlightNodes(leftCaseLabel, rightCaseLabel, lcaNode?.label || "")
                }
            }
        }
        
    }

    /**
     * Create a new visualization of the whole taxonomy highlighting the nodes that represent
     * the taxonomy labels of the left and right case 
     * @param leftLabel The label of the taxonomy concept of the left case
     * @param rightLabel The label of the taxonomy concept of the right case
     * @param lcaLabel The label of the lower common ancestor of left and right taxonomy labels
     */
    private highlightNodes(leftLabel:string, rightLabel:string, lcaLabel:string) { 
        let data: VisTaxonomyData = JSON.parse(JSON.stringify(this.taxonomyVisData));
        // Remove previous highlighting
        data.nodes.forEach((elem) => delete elem.group);
        let index = data.nodes.findIndex(e => e.label === leftLabel);
        if (index !== -1) {
            data.nodes[index]["group"] = "leftItem";
        }
        
        index = data.nodes.findIndex(e => e.label === rightLabel);
        if (index !== -1) {
            data.nodes[index]["group"] = "rightItem";
        }

        index = data.nodes.findIndex(e => e.label === lcaLabel);
        if (index !== -1) {
            data.nodes[index]["group"] = "lca";
        }

        if (this.taxonomyContainerNode) {
            this.taxonomyGraph = new vis.Network(this.taxonomyContainerNode, data, DEFAULT_VIS_OPTIONS);
        }

    }

    /**
     * Creates a subtree visualization between two nodes identified by their labels.
     * The node root of the subtree will be the lowest common ancestor (LCA) of these nodes.
     * @param c1Label - The label of the first node.
     * @param c2Label - The label of the second node.
     * @returns The subtree data containing nodes and edges, or null if nodes  are not found.
     */
    private createSubtree(c1Label: string, c2Label: string): VisTaxonomyData | null {
        let c1Node = this.theTaxonomy.findNodeByLabel(c1Label);
        let c2Node = this.theTaxonomy.findNodeByLabel(c2Label);
        let lcaNode = this.theTaxonomy.findLCA(c1Label, c2Label);
        if (c1Node && c2Node && lcaNode) {
            let visData: VisTaxonomyData = {
                nodes: [c1Node, c2Node],
                edges: []
            }
            // Both nodes are the same so we create a fake subtree with the same node and
            // an edge between them
            if (c1Node.label === c2Node.label) {
                //Change the id to create the second fake node
                let c2NodeCopy = JSON.parse(JSON.stringify(c2Node));
                c2NodeCopy.id +=1;
                visData.nodes[1] = c2NodeCopy;
                visData.edges.push({
                    id: 0,
                    from: c1Node.id,
                    to: c2NodeCopy.id
                });
            } else{ 
                let curId = 0;
                curId = this.edgesBetween(c1Node, lcaNode, curId, visData);
                curId = this.edgesBetween(c2Node, lcaNode, curId, visData);
            }
            return visData;
        }
        else {
            return null;
        }
    }

    /**
     * Find edges between two nodes.
     *
     * @param c1Node - The starting node.
     * @param c2Node - The ending node.
     * @param currentEdgeId - The current edge ID to be used.
     * @param visData - The visualization data containing nodes and edges.
     * @returns The updated edge ID after adding the necessary edges.
     */
    private edgesBetween(c1Node: TaxonomyNode, c2Node: TaxonomyNode, currentEdgeId: number, visData: VisTaxonomyData): number {
        if (c1Node !== c2Node) {
            let parentNode = this.theTaxonomy.findNodeById(c1Node.parent);
            if (parentNode) {
                if (!visData.nodes.find(n => parentNode.id === n.id)) {
                    visData.nodes.push(parentNode);
                }
                visData.edges.push({
                    id: currentEdgeId,
                    from: parentNode.id,
                    to: c1Node.id
                });
                currentEdgeId += 1;
                currentEdgeId = this.edgesBetween(parentNode, c2Node, currentEdgeId, visData);
            }
        }
        return currentEdgeId;
    }
}