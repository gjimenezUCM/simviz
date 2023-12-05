import Plotly from 'plotly.js-dist-min';
//import { itemLoader } from './item-loader';
export class Heatmap {
    constructor(controller, index, data, containerNode){
        this.controller = controller;
        this.index = index;
        this.data = data;
        this.currentData = data;
        this.currentX = index;
        this.currentY = index;
        this.containerNode = containerNode;
        this._init(this.index, this.index, this.data);
    }

    _init() {
        let containerWidth = this.containerNode.offsetWidth;
        let containerHeight = this.containerNode.parentNode.offsetHeight;

        const magmaColorscaleValue = [
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


        let data = [{
            x: this.currentX,
            y: this.currentY,
            z: this.currentData,
            type: 'heatmap',
            colorscale: magmaColorscaleValue,
            showscale: true,
            hovertemplate: "id: %{y}<br>id: %{x}<br>Similarity: %{z}<extra></extra>",
            colorbar: {
                orientation: 'h',
                x:0.01,
                y:1,
                yanchor:'top',
                xanchor: 'left',
                xref: 'container',
                yref: 'container'
            },
        }];


        let layout = {
            paper_bgcolor: 'transparent',
            margin: {
                l: 10,
                r: 10,
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
            height: containerHeight,
            width: containerWidth
        };

        this.heatmapPlot = Plotly.newPlot(this.containerNode, data, layout);
        this.containerNode.on('plotly_click', (data) => this.onClickHeatmap(data));
    }

    refresh(){
        this._init();
    }

    filterById(itemId, sorted) {
        let rowId = this.index.indexOf(itemId);
        if (rowId !== -1){
            if (sorted) {
            let sortedRowData = [];
            let i=0;
            for (let cell of this.data[rowId]) {
                sortedRowData[i]= [cell,i];
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
        this.currentY = this.index;
        this._init();
    }

    onClickHeatmap(data) {
        if (data.points.length === 1) {
            if (data.points[0].z) {
                let colId = data.points[0].x;
                let rowId = data.points[0].y;
                if (this.controller) {
                    this.controller.updateItemInfo(rowId, colId);
                    this.controller.updateSelectedItem(rowId);
                }
            }
        }
    }

}