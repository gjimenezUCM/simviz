import Plotly from 'plotly.js-dist-min';

window.addEventListener("load", (event) => {
    let tester = document.getElementById('tester');
    console.log("Está el elem con id?", tester);
    Plotly.newPlot(tester, [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16]
    }], {

        margin: { t: 0 }
    });
})

