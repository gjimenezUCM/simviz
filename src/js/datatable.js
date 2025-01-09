/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'tabulator-tables/dist/css/tabulator_bootstrap5.min.css'
import '../css/simviz.style.css';

/*
* JS/TS imports
*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Popover } from "bootstrap";
import nanoMarkdown from 'nano-markdown';

import { FormatModule, DataTreeModule, Tabulator } from 'tabulator-tables';

const data =[ {
    attribute: {
        name: "year",
        similarityDescription: {
            "simFunction": "RangeSimilarity",
            "weight": 0.5*100,
            "description": "Similarity normalized in range (1950,2021)"
        },
    },
    leftCase: 2016,
    rightCase: 2018,
    value: 0.972,
},
    {
        attribute: {
            name: "make",
            similarityDescription: {
                "simFunction": "Nested similarity",
                "weight": 0.5*100,
                "description": "Weighted similarity of the nested attributes"
            },
        },
        leftCase: "",
        rightCase: "",
        value: 0.12,
        _children: [
            {
                attribute: {
                    name: "model",
                    similarityDescription: {
                        "simFunction": "Levensthein",
                        "weight": 0.3*100,
                        "description": "String similarity using Levensthein"
                    },
                },
                leftCase: "silverado 2500 ltz",
                rightCase: "outlander se",
                value: 0.1,
            },
            {
                attribute: {
                    name: "manufacturer",
                    similarityDescription: {
                        "simFunction": "Levensthein",
                        "weight": 0.7*100,
                        "description": "String similarity using Levensthein"
                    },
                },
                leftCase: "chevrolet",
                rightCase: "mitsubishi",
                value: 0.27,
            }              
        ]
    }
]
window.addEventListener("load", (event) => { 
    Tabulator.registerModule([DataTreeModule, FormatModule]);

    let table = new Tabulator('#case-comparison-table', {
        data:data,
        dataTree:true,
        dataTreeBranchElement:false,
        layout:"fitDataFill",
        columns:[
            { 
                field: 'attribute.name',
                title: 'Attribute',
                formatter:"textarea",
                width: "30%",
                cssClass:"dt-att-name"
            },
            { field: 'attribute.similarityDescription.weight', width: "10%",
                formatter:"progress",
                formatterParams:{
                    color: "#dda8f8",
                    legendColor:"#000000",
                    legendAlign:"center",
                    legend: formatNumber
                },
                cssClass:"dt-att-weight",
                vertAlign: "bottom"
            },
            { field: 'attribute.similarityDescription', width: "5%",
                formatter: renderSimilarityFunction,
            },
            {
                width: "55%",
                columns:[
                { field: 'leftCase' , width: "20%",hozAlign:"right", formatter:"textarea"},
                { 
                    field: 'value',
                    hozAlign:"center",
                    cssClass:"dt-att-value"
                },
                { field: 'rightCase', width: "20%",formatter:"textarea"}           
                ]
            }
        ]
    });


});     
function formatNumber(value) {
    return Number(value).toFixed(2) + "%"
}

function renderSimilarityFunction(cell, formatterParams, onRendered) {
    let data = cell.getValue();
    const template = document.createElement('template');
    template.innerHTML = `<button class="btn btn-dark btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon" width="14"></button>`;
    let button = template.content.firstChild;
    const popover = new Popover(button, {
        title: data.simFunction,
        content: nanoMarkdown(data.description),
        placement: "bottom",
        html: true,
        trigger: 'focus'
    })
    button.addEventListener('inserted.bs.popover', () => {
        let links = document.querySelectorAll(".popover-body a");
        if (links) {
            for (let aLink of links) {
                aLink.setAttribute("target", "_blank");
            }
        }
    });   
    return button;
}



