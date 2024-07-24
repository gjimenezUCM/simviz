
import { theController } from "../controller";
import { Popover } from "bootstrap";
import nanoMarkdown from 'nano-markdown';
import { SimConfigurator } from "./simConfigurator";
import { theSimilarityDAO } from "../DAO/similarityDAO";
import { CasebaseDAO } from "../DAO/casebaseDAO";
import { SimilarityDescription } from "../types/simvizTypes";

/**
 * Max size in pixels of the bar that visually represents a weight
 */
const MAX_WEIGHTBAR_SIZE_PX = 50;

/**
 * Class component in charge of the similarity panel in the UI
 */
export class SimilarityPanel {

    /**
     * The panel for configuring new similarity functions
     */
    private simConf: SimConfigurator;
    
    /**
     * A DAO that stores casebases
     */
    //private casebaseDAO: CasebaseDAO;

    /**
     * The button for activating the panel for configuring new similarity functions
     */
    private configSimilarityButton: HTMLButtonElement | null;


    /**
     * The dropdown employed to select a similarity function
     */
    private similarityFunctionMenu: HTMLSelectElement | null;

    /**
     * Constructor
     */
    constructor() {
        this.simConf = new SimConfigurator(this);
        this.configSimilarityButton = document.getElementById("btn-show-configurator") as HTMLButtonElement;
    }

    /**
     * Initialize the similarity panel using the DAOs already loaded
     */
    init(){
        const simFiles = theSimilarityDAO.getFiles();
        this.similarityFunctionMenu = document.getElementById("similarity-select") as HTMLSelectElement;
        if (this.similarityFunctionMenu){
            this.similarityFunctionMenu.innerHTML = "<option selected>Choose similarity function...</option>";
            for (let file of simFiles) {
                this.addSimilarityFunctionToDropdown(file);
            }
            this.similarityFunctionMenu.addEventListener("change", () => {
                if (this.similarityFunctionMenu && this.similarityFunctionMenu.selectedIndex !== 0) {
                    this.loadSimilarityFunction(this.similarityFunctionMenu.value);
                }
            });
            this.similarityFunctionMenu.selectedIndex = 0;
            this.updateSimilarityDescription(null);
        }
        
        if (this.configSimilarityButton){
            this.configSimilarityButton.classList.add("visually-hidden");
        }        
    }

    /**
     * Load a similarity function
     * @param similarityFunctionName Name of the similarity function that should be loaded
     */
    private async loadSimilarityFunction(similarityFunctionName:string) {
        // This is a time consuming task so show the spin loader
        theController.showLoadingOverlay();
        let simData = await theSimilarityDAO.getSimilarityDataByName(similarityFunctionName);
        if (simData) {
            // We need to use a setTimeout to show the spin while loading
            setTimeout(() => {
                theController.init(simData);
                this.updateSimilarityDescription(simData.similarityDescription);
                this.simConf.init(simData);
                // Show the configuration button
                if (this.configSimilarityButton){
                    this.configSimilarityButton.classList.remove("visually-hidden");    
                }
                // Hide the spin loader
                theController.hideLoadingOverlay();            
            }, 0);
        }
    }

    /**
     * Add a new similarity function to the dropdown element of the similarity panel.
     * By default, the similarity function is added but the function is not selected.
     * However, it can be automatically selected using the "andSelect" parameter
     * @param simFunctionName Name of the similarity function added
     * @param andSelect If true, it changes the dropdown to the added similarity function (and loads it)
     */
    addSimilarityFunctionToDropdown(simFunctionName:string, andSelect:boolean = false){
        let item = document.createElement('template');
        item.innerHTML = `<option class="dropdown-item" data-sim-name="${simFunctionName}">${simFunctionName}</option>`;
        if (this.similarityFunctionMenu){
            this.similarityFunctionMenu.appendChild(item.content.children[0]);
            if (andSelect) {
                this.similarityFunctionMenu.selectedIndex = this.similarityFunctionMenu.childElementCount - 1;
                this.similarityFunctionMenu.dispatchEvent(new Event('change', { 'bubbles': true }));
            } 
        }    
    }

    /**
     * Update the information about the selected similarity function
     * @param simDescription Description of the similarity function that should be updated.
     * If null, it removes the previous information displayed by the panel
     */
    private updateSimilarityDescription(simDescription: SimilarityDescription|null): void {
        let parent = document.getElementById("sim-desc");
        if (parent) {
            // If the paremeter is null, remove the current information
            if (simDescription === null) {
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
            if (tableParent){
                // Populate the table with local similarity functions
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
        }
        this.populateWeights();
    }

    /**
     * Create the bars for the weights 
     */
    private populateWeights() {
        let weights = document.querySelectorAll("#similarity-descriptor .att-weight");
        for (let w of weights) {
            let weightString = w.getAttribute("data-weight");
            let wValue = weightString ? parseFloat(weightString) : 0.0;
            let frameBar = document.createElement("div");
            frameBar.style.width = `${MAX_WEIGHTBAR_SIZE_PX + 2}px`;
            frameBar.style.border = "1px solid black"
            w.appendChild(frameBar);
            let weightBar = document.createElement("div");
            weightBar.classList.add("att-weight-bar");
            weightBar.innerHTML = `${(wValue * 100).toFixed(2)}%`
            weightBar.style.width = `${MAX_WEIGHTBAR_SIZE_PX * wValue}px`;
            frameBar.appendChild(weightBar);
        }
    }
}
