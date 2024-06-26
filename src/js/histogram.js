import Plotly from 'plotly.js-dist-min';
import { theController } from './controller';

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
        let containerWidth = this.containerNode.offsetWidth;
        let containerHeight = this.containerNode.parentNode.offsetHeight;
        let trace = {
            x: this.data,
            type: 'histogram',
            histnorm: 'percent',
            xbins: {
                start: 0.0,
                size: 0.10000001, // Para que en el último bin entre el 1.0 y no desplace demasiado el resto
                end: 1.0
            },
            marker: {
                color: magmaColorscaleValue
            },
            hovertemplate: "%{x}%<extra></extra>",
        };
        let layout = {
            paper_bgcolor: 'transparent',
            plot_bgcolor: "transparent",
            margin: {
                l: 0,
                r: 20,
                b: 0,
                t: 10,
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
            theController.updateItemsInfo(this.matrixIndex[randomValue][0],
                                            this.matrixIndex[randomValue][1],
                                            this.data[randomValue],
                                            magmaColorscaleValue[~~(this.data[randomValue] * 10)]);
            theController.updateSelectedItem(this.matrixIndex[randomValue][0]);
        }
    }

    refresh() {
        this._init();
    }
}