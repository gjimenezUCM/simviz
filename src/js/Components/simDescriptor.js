export function updateSimilarityDescription(simDescription) {
    let parent = document.getElementById("sim-desc");
    if (parent) {
        let trows = "";
        for (let [ attName, localDesc ] of Object.entries(simDescription.localSim)){
            trows += `<tr>
                    <td>${attName}</td>
                    <td>${localDesc.simFunction}</td>
                    <td>
                        <div class="att-weight align-self-center" data-weight="${localDesc.weight}"></div>
                    </td>
                </tr>`;
        }

        parent.innerHTML = `<h3>Global function</h3>
        <p id="global-sim-desc">${simDescription.globalSim.simFunction}</p>
        <h3>Local functions</h3>
        <table id="local-sim-desc"class="table table-striped">
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Function</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
            ${trows}
            </tbody>
        </table>
        `
    }
}