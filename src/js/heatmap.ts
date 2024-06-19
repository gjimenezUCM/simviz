import Plotly, { PlotlyHTMLElement } from 'plotly.js-dist-min';
import { PlotEventNotifier } from './plotObserver';

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
export class Heatmap extends PlotEventNotifier {

    private index: Array<string>;
    private data: Array<Array<number>>;
    private currentData: Array<Array<number>>;
    private currentX: Array<string>;
    private currentY: Array<string>;
    /**
    * HTML element where the histogram is drawn
    */
    private containerNode: HTMLElement;

    constructor(index: Array<string>, data: Array<Array<number>>, containerNode: HTMLElement){
        super();
        this.index = index;
        this.data = data;
        this.currentData = JSON.parse(JSON.stringify(this.data));
        this.currentX = [...index];
        this.currentY = [...index];
        this.containerNode = containerNode;
        this._init();
    }

    _init() {
        let containerWidth = this.containerNode.offsetWidth;
        let containerHeight = this.containerNode.parentNode ? (<HTMLElement>this.containerNode.parentNode).offsetHeight : 0;

        let data: Plotly.Data = {
            x: this.currentX,
            y: this.currentY,
            z: this.currentData,
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
        (<PlotlyHTMLElement>this.containerNode).on('plotly_click', (data) => this.onClickHeatmap(data));
    }

    refresh(){
        this._init();
    }

    filterById(itemId:string, sorted:boolean) {
        let rowId = this.index.indexOf(itemId);
        if (rowId !== -1){
            if (sorted) {
            let sortedRowData = [];
            let i=0;
            for (let cell of this.data[rowId]) {
                sortedRowData[i] = [JSON.parse(JSON.stringify(cell)),i];
                i++;
            }
            sortedRowData.sort((a,b)=> a[0]-b[0]);
            let sortedRowIndex = [];
            i=0;
            this.currentData = [[]];
            for (let elem of sortedRowData) {
                sortedRowIndex[i] = this.index[elem[1]];
                this.currentData[0][i] = this.data[rowId][elem[1]];
                i++;
            }
            this.currentY = [itemId];
            this.currentX = sortedRowIndex;
        } else {
            this.currentData = [this.data[rowId]];
            this.currentY = [itemId];
            this.currentX = this.index;
        }
            this._init();
        }
    }

    reset() {
        this.currentData = this.data;
        this.currentX = this.index;
        this.currentY = this.index;
        this._init();
    }

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

}