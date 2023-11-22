import Plotly from 'plotly.js-dist-min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  itemLoader } from './item-loader';

import { daoItems } from './mockdata';

let itemIds = daoItems.getIds();

let mockSimData = [];
let itemSize = itemIds.length;

for (let i = 0; i<itemSize; i++) {
    let row =[];
    for (let j = 0; j < itemSize; j++) {
        row[j] = Math.random();
    }
    mockSimData[i] = row;
}

const colorscaleValue = [
    [0, '#3D9970'],
    [1, '#001f3f']
];


let data = [{
    x: itemIds,
    y: itemIds,
    z: mockSimData,
    type: 'heatmap',
    colorscale: colorscaleValue,
    showscale: false
}];


let layout = {
    title: 'Heatmap',
    xaxis: {
        ticks: '',
        side: 'top'
    },
    yaxis: {
        ticks: '',
        ticksuffix: ' ',
        width: 700,
        height: 1000,
        autosize: false
    }
};


window.addEventListener("load", (event) => {
    let heatmap = document.getElementById('heatmap');
    Plotly.newPlot('heatmap', data, layout);

    heatmap.on('plotly_click', function (data) {
       if (data.points.length === 1){
            let row = data.points[0].x;
            let col = data.points[0].y;
            itemLoader.changeRowItem(daoItems.getItemById(row));
            itemLoader.changeColItem(daoItems.getItemById(col));
           itemLoader._createHandlebars(daoItems.getItemById(col));
        }
    });
})
