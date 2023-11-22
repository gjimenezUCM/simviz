import Plotly from 'plotly.js-dist-min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { anArtworkRow, anArtworkCol, createItemElement } from './item-loader';






let xValues = ['A', 'B', 'C', 'D', 'E'];

let yValues = ['W', 'X', 'Y', 'Z'];

let zValues = [
    [0.00, 0.00, 0.75, 0.25, 0.00],
    [0.00, 0.00, 0.75, 0.75, 0.00],
    [0.75, 0.75, 0.5, 0.75, 0.75],
    [0.00, 0.00, 0.00, 0.75, 0.00]
];


const colorscaleValue = [
    [0, '#3D9970'],
    [1, '#001f3f']
];


let data = [{
    x: xValues,
    y: yValues,
    z: zValues,
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
        height: 700,
        autosize: false
    }
};


window.addEventListener("load", (event) => {
    let heatmap = document.getElementById('heatmap');
    Plotly.newPlot('heatmap', data, layout);

    heatmap.on('plotly_click', function (data) {
       if (data.points.length === 1){
           for (var prop in data.points[0]) {
               if (data.points[0].hasOwnProperty(prop)) {
                   console.log(prop,data.points[0][prop]);
               }
           }
        }
    });

    let itemElement = createItemElement(anArtworkCol);
    let colElement = document.getElementById('item-col');
    colElement.appendChild(itemElement);

    itemElement = createItemElement(anArtworkRow);
    let rowElement = document.getElementById('item-row');
    rowElement.appendChild(itemElement);

})

