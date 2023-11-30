import Plotly from 'plotly.js-dist-min';
import { itemLoader } from './item-loader';
export class Histogram {
    constructor(index, matrix, containerNode) {
        this.matrixIndex = [];
        this.data = [];
        for (let i=0; i<index.length; i++) {
            for (let j = 0; j <index.length; j++) {
                let curIndex = j*i + j;
                this.matrixIndex[curIndex] = [index[i], index[j]];
                this.data[curIndex] = matrix[i][j];
            }
        }
        this.containerNode = containerNode;
        this._init();
    }

    _init() {
        const magmaColorscaleValue = [
            '#000004',
            '#180f3d',
            '#440f76',
            '#721f81',
            '#9e2f7f',
            '#cd4071',
            '#f1605d',
            '#fd9668',
            '#feca8d',
            '#fcfdbf'
        ];
        let containerWidth = this.containerNode.offsetWidth;
        let containerHeight = this.containerNode.parentNode.offsetHeight;
        let trace = {
            x: this.data,
            type: 'histogram',
            histnorm: 'probability',
            xbins: {
                start: 0.0,
                size: 0.1,
                end: 1.0
            },
            marker: {
                color: magmaColorscaleValue
            },
            hovertemplate: "%{y}<extra></extra>",
        };
        let layout = {
            paper_bgcolor: 'transparent',
            margin: {
                l: 10,
                r: 10,
                b: 0,
                t: 20,
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
                font: {
                    color: "black",
                    size: 16
                }
            },
            height: containerHeight,
            width: containerWidth
        }
        let config = { responsive: true }
        this.histogramPlot = Plotly.newPlot(this.containerNode, [trace], layout, config);
        this.containerNode.on('plotly_click', (data)=>this.onClickHistogram(data));
    }

    onClickHistogram(data) {
        if (data.points.length === 1) {
            let randomValue = data.points[0].pointIndices[Math.floor((Math.random() * data.points[0].pointIndices.length))];
            itemLoader.changeRowItemById(this.matrixIndex[randomValue][0]);
            itemLoader.changeColItemById(this.matrixIndex[randomValue][1]);
        }
    }

    refresh() {
        this._init();
    }
}