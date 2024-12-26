/*
* CSS imports
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../css/simviz.style.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';


/*
* JS/TS imports
*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-plugins/dataRender/percentageBars.js';
import { Popover } from "bootstrap";
import nanoMarkdown from 'nano-markdown';

const data =[ {
    attribute: {
        name: "ClumpThickness",
        similarityDescription: {
            "simFunction": "RangeSimilarity",
            "weight": 0.1111111111111111*100,
            "description": "Maximum similarity similarity when comparing two sets of colors. Similarity between every pair of colors is computed using [Delta E 2000 color difference function](http://www.colorwiki.com/wiki/Delta_E:_The_Color_Difference#dE2000), which is a standard measurement that quantifies the difference between two colors that appear on a screen"
        },
    },
    leftCase: 4,
    rightCase: 5,
    value: 0.923
},
    {
        attribute: {
            name: "ClumpThickness",
            weight: 100,
            similarityDescription: {
                "simFunction": "RangeSimilarity",
                "weight": 0.1111111111111111*100,
                "description": "Similarity normalized in range (1,14)"
            },
        },
        leftCase: 4,
        rightCase: 5,
        value: 0.923
    }
]
window.addEventListener("load", (event) => { 
    let table = new DataTable('#case-comparison-table', {
        paging: false,
        info: false,
        ordering: false,
        searching: false,
        columnDefs: [
            { targets: [0], width: "35%", className: 'dt-left' },
            { targets: [1], width: "10%", render: DataTable.render.percentBar("round", 'auto', 'black', '#dda8f8'), className: 'dt-right  att-weight-bar' },
            { targets: [2], width: "10%", render: renderSimilarityFunction, className: 'dt-left' }, 
            { targets: [4], render: DataTable.render.number(null, ".", 2) },
        ],
        columns: [
            { data: 'attribute.name', title: 'Name' },
            { data: 'attribute.similarityDescription.weight' },
            { data: 'attribute.similarityDescription' },
            { data: 'leftCase' },
            { data: 'value' },
            { data: 'rightCase' }
        ],
        data: data,
        createdRow: (row, data, index) => {
            let button = row.querySelector("button.btn-function");
            
            if (button) {
                const popover = new Popover(button, {
                    content: nanoMarkdown(data.attribute.similarityDescription.description),
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
            }
            console.log(button)
        }
    }); 

    table.rows().every(function () {
        let rowIdx = 5;
        let n =  document.createElement("tr");
        n.innerHTML = '<td>' +
            rowIdx +
            '.1</td>' +
            '<td>' +
            rowIdx +
            '.2</td>' +
            '<td>' +
            rowIdx +
            '.3</td>' +
            '<td>' +
            rowIdx +
            '.4</td>' +
            '</tr>';
        this.child(n).show();
    });
    let tableBody = document.querySelector('#case-comparison-table tbody');
    table.on('click', 'td.details-control', function () {
        var tr = tableBody.parents('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row (the format() function would return the data to be shown)
            if (row.child() && row.child().length) {
                row.child.show();
            }
            else {
                row.child(format(row.data())).show();
            }
            tr.addClass('shown');
        }
    });

});     

function renderSimilarityFunction(data, type, row) {
    if (type === "display"){
        //console.log(data, row, type);
        return `<button class="btn btn-dark btn-sm btn-function"><img src="./images/function-white.png" alt="similarity function icon" width="18"></button>`;
    }
    return null;
}

function renderAttName(data, type, row) {
    if (type === "display") {
        
    }
}

