import Plotly from 'plotly.js-dist-min';
export class Heatmap {
    constructor(index, data, containerNode){
        this.index = index;
        this.data = data;
        this.containerNode = containerNode;
        this._initHeatmap();
    }

    _initHeatmap() {
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
            x: this.index,
            y: this.index,
            z: this.data,
            type: 'heatmap',
            colorscale: magmaColorscaleValue,
            showscale: true
        }];


        let layout = {
            paper_bgcolor: 'transparent',
            margin: {
                l: 10,
                r: 10,
                b: 10,
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
            height: containerHeight,
            width: containerWidth
        };

        this.heatmapPlot = Plotly.newPlot(this.containerNode, data, layout);
    }

    refreshHeatmap(){
        this._initHeatmap();
    }

}