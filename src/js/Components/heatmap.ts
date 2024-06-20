import Plotly, { PlotlyHTMLElement } from 'plotly.js-dist-min';
import { PlotEventNotifier } from '../plotObserver';

/**
* Heatmap colors
*/
const magmaColorscaleValue: Array<[number, string]> = [
    [0.0, '#000004'],
    [0.1111111111111111, '#180f3d'],
    [0.2222222222222222, '#440f76'],
    [0.3333333333333333, '#721f81'],
    [0.4444444444444444, '#9e2f7f'],
    [0.5555555555555556, '#cd4071'],
    [0.6666666666666666, '#f1605d'],
    [0.7777777777777777, '#fd9668'],
    [0.8888888888888888, '#feca8d'],
    [1.0, '#fcfdbf']
];

/**
* The class that plots and stores the heatmap, which displays the
* the similarity values between every pair of cases in a casebase.
* This heatmap is interactive, so when the user clicks on a cell, 
* the class notifies to its observers the information about the pair of cases
* represented in this cell. For this reason,  this class implements the PlotEventNotifier.
* 
* Additionally, this class displays the stripe charts that appear when 
* the user clicks on the pin icon on the header of the Table comparator. 
* This way, the heatmap is transformed into a stripe chart, where each stripe is 
* the similarity value of the selected case with another case in the casebase. 
* The stripechart is sorted by similarity value.
*/

export class Heatmap extends PlotEventNotifier {
    
    
    /**
    * Unique ids of the cases represented in this heatmap
    */
    private caseIds: Array<string>;
    
    /**
    * Similarity matrix
    */
    private matrix: Array<Array<number>>;
    
    /**
    * The current state of the similarity matrix (the original one
    * can be modified due to user interactions)
    */
    private currentMatrix: Array<Array<number>>;
    
    /**
    * Current X axis. It is modified by user interactions
    */
    private currentX: Array<string>;
    
    /**
    * Current Y axis. It is modified by user interactions
    */
    private currentY: Array<string>;
    
    /**
    * HTML element where the histogram is drawn
    */
    private containerNode: HTMLElement;
    
    /**
    * Constructor
    * @param ids A list with the unique ids of a casebase
    * @param matrix A similarity matrix
    * @param containerNode The HTML node that will contain the histogra,
    */
    constructor(ids: Array<string>, matrix: Array<Array<number>>, containerNode: HTMLElement){
        super();
        this.caseIds = ids;
        this.matrix = matrix;
        this.currentMatrix = JSON.parse(JSON.stringify(this.matrix));
        this.currentX = [...ids];
        this.currentY = [...ids];
        this.containerNode = containerNode;
        this._init();
    }
    
    /**
    * Initialize the heatmap with the data provided on creation
    */
    private _init() {
        let containerWidth = this.containerNode.offsetWidth;
        let containerHeight = this.containerNode.parentNode ? (<HTMLElement>this.containerNode.parentNode).offsetHeight : 0;
        
        let data: Plotly.Data = {
            x: this.currentX,
            y: this.currentY,
            z: this.currentMatrix,
            type: 'heatmap',
            colorbar: {
                orientation: "h"
            },
            colorscale: magmaColorscaleValue,
            showscale: true,
            hovertemplate: "id: %{y}<br>id: %{x}<br>Similarity: %{z}<extra></extra>",
        };
        
        
        let layout: Partial<Plotly.Layout> = {
            paper_bgcolor: 'transparent',
            margin: {
                l: 10,
                r: 20,
                b: 10,
                t: 0,
            },
            xaxis: {
                // No tick labels
                showticklabels: false,
                // No ticks
                tickmode: 'array',
                tickvals: []
            },
            yaxis: {
                // No tick labels
                showticklabels: false,
                // No ticks
                tickmode: 'array',
                tickvals: []
            },
            hoverlabel: { 
                bgcolor: "aliceblue",
                font:  {
                    color: "black",
                    size: 16
                }
            },
            height: containerWidth,
            width: containerWidth
        };
        
        Plotly.newPlot(this.containerNode, [data], layout);
        // Suscribe to plotly click events
        (<PlotlyHTMLElement>this.containerNode).on('plotly_click', (data) => this.onClickHeatmap(data));
    }
    
    /**
    * Create a stripe chart filtering the heatmap by the caseId.
    * @param caseId The caseId selected for the stripe chart
    * @param sorted Whether the stripe chart is sorted by similarity valu or not
    */
    filterById(caseId:string, sorted:boolean): void {
        let rowId = this.caseIds.indexOf(caseId);
        if (rowId !== -1){
            if (sorted) {
                let sortedRowData = [];
                let i=0;
                for (let cell of this.matrix[rowId]) {
                    sortedRowData[i] = [JSON.parse(JSON.stringify(cell)),i];
                    i++;
                }
                sortedRowData.sort((a,b)=> a[0]-b[0]);
                let sortedRowIndex = [];
                i=0;
                this.currentMatrix = [[]];
                for (let elem of sortedRowData) {
                    sortedRowIndex[i] = this.caseIds[elem[1]];
                    this.currentMatrix[0][i] = this.matrix[rowId][elem[1]];
                    i++;
                }
                this.currentY = [caseId];
                this.currentX = sortedRowIndex;
            } else {
                this.currentMatrix = [this.matrix[rowId]];
                this.currentY = [caseId];
                this.currentX = this.caseIds;
            }
            this._init();
        }
    }
    
    /**
    * Reset the histogram to the original state after initialization
    */
    reset() {
        this.currentMatrix = this.matrix;
        this.currentX = this.caseIds;
        this.currentY = this.caseIds;
        this._init();
    }

    /**
     * Create the data for the PlotEvent handlers and notify them
     * @param data The data provided by Plotly
     */
    onClickHeatmap(data:any) {
        if (data.points.length === 1) {
            if (data.points[0].z !== null) {
                let colId = String(data.points[0].x);
                let rowId = String(data.points[0].y);
                let colorPos = Math.trunc(data.points[0].z * 10);
                colorPos = (colorPos==10 ? 9 : colorPos);
                let color = magmaColorscaleValue[colorPos][1];
                this.notify({
                    id1: rowId,
                    id2: colId,
                    similarityValue: data.points[0].z,
                    color: color
                });
            }
        }
    }
    
    /**
    * Invoked when the user resizes the layout
    */
    refresh() {
        this._init();
    }
    
}