import { SimConfigurator } from "./simConfigurator";
import { theController } from "../controller";
import { Popover } from "bootstrap";
import nanoMarkdown from 'nano-markdown';

const maxSize = 50;
class SimilarityPanel {
    constructor() {
        this.simConf = new SimConfigurator(this);
        this.configButton = document.getElementById("btn-show-configurator");
    }
    init(simDAO, itemDAO){
        this.simDAO = simDAO;
        this.itemDAO = itemDAO;
        const simFiles = simDAO.getFiles();
        this.simMenu = document.getElementById("similarity-select");
        this.simMenu.innerHTML = "<option selected>Choose similarity function...</option>";
        for (let file of simFiles) {
            this.addSimilarityFunctionToDropdown(file);
        }
        this.simMenu.addEventListener("change", () => {
            if (this.simMenu.selectedIndex !== 0) {
                this.loadSimilarityFunction(this.simDAO, this.itemDAO, this.simMenu.value);
            }
        });
        this.updateSimilarityDescription("");
        this.configButton.classList.add("visually-hidden");
        
    }

    async loadSimilarityFunction(simDAO, itemDAO, similarityFunctionName) {
        theController.showLoadingOverlay();
        let simData = await this.simDAO.getSimilarityDataByName(similarityFunctionName);
        if (simData) {
            theController.init(this.itemDAO, simData);
            window.addEventListener("resize", (event) => {
                theController.onResize();
            });

            this.updateSimilarityDescription(simData.similarityDescription);
            this.simConf.init(simDAO, simData);
            this.configButton.classList.remove("visually-hidden");
        }
        theController.hideLoadingOverlay()
    }

    addSimilarityFunctionToDropdown(simFunctionName, andChange){
        let item = document.createElement('template');
        item.innerHTML = `<option class="dropdown-item" data-sim-name="${simFunctionName}">${simFunctionName}</option>`;
        this.simMenu.appendChild(item.content.children[0]);  
        if (andChange){
            this.simMenu.selectedIndex = this.simMenu.childElementCount-1;
            this.simMenu.dispatchEvent(new Event('change', { 'bubbles': true }));
        }     
    }

    updateSimilarityDescription(simDescription) {
        let parent = document.getElementById("sim-desc");
        if (parent) {
            if (simDescription === "") {
                parent.innerHTML = "";
                return;
            }

            parent.innerHTML = `<h3>Global function</h3>
            <p id="global-sim-desc">${simDescription.globalSim.simFunction}</p>
            <h3>Local functions</h3>
            <div class="table-responsive">
            <table id="local-sim-desc"class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Function</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                </tbody>
            </table>
            </div>`

            let tableParent = parent.querySelector("tbody.table-group-divider");
            for (let [attName, localDesc] of Object.entries(simDescription.localSim)) {
                let aRow = document.createElement("tr");
                aRow.innerHTML = `<td>${attName}</td>
                    <td class="sim-function-name">${localDesc.description ? '<button class="btn btn-outline-dark btn-sm"><i class="bi bi-question-circle-fill"></i></button>' : ''}${localDesc.simFunction}</td>
                    <td>
                        <div class="att-weight align-self-center" data-weight="${localDesc.weight}"></div>
                    </td>`;
                tableParent.appendChild(aRow);
                if (localDesc.description){
                    let helpIcon = aRow.querySelector("button");
                    if (helpIcon){
                        const popover = new Popover(helpIcon,{
                            content: nanoMarkdown(localDesc.description),
                            placement: "bottom",
                            html: true,
                            trigger: 'focus'
                        })
                        helpIcon.addEventListener('inserted.bs.popover', ()=>{
                            let links = document.querySelectorAll(".popover-body a");
                            if (links) {
                                for (let aLink of links) {
                                    aLink.setAttribute("target", "_blank");
                                }
                            }
                        });
                    }
                }
            }


        }
        this._populateWeights();
    }
    _populateWeights() {
        let weights = document.querySelectorAll("#similarity-descriptor .att-weight");
        for (let w of weights) {
            let wValue = w.getAttribute("data-weight");
            let frameBar = document.createElement("div");
            frameBar.style.width = `${maxSize + 2}px`;
            frameBar.style.border = "1px solid black"
            w.appendChild(frameBar);
            let weightBar = document.createElement("div");
            weightBar.classList.add("att-weight-bar");
            weightBar.innerHTML = `${(wValue * 100).toFixed(2)}%`
            weightBar.style.width = `${maxSize * wValue}px`;
            frameBar.appendChild(weightBar);
        }
    }
}
const similarityPanel = new SimilarityPanel();
export { similarityPanel };