
import { SimilarityComputing } from '../utils/similarityComputing';
import { theController } from "../controller";
import { SimilarityPanel } from './similarityPanel';
import SimilarityData from "../DAO/similarityData";
import { theSimilarityDAO } from '../DAO/similarityDAO';
import TemplateManager from '../utils/templateManager';

const formAttributeRow = `
        <div class="col-4 text-end"><label for="input-att-{{attName}}" class="form-label">{{attName}}</label></div>
        <div class="col-3"><input class="form-control" id="input-att-{{attName}}" value={{weightValue}} aria-describedby="att-{{attName}}-weight"></div>
        <div class="col-3"><input type="range" class="form-range" min="0" max="1" step="0.05" value={{weightValue}} id="range-att-{{attName}}"></div>`;

/**
 * This class represents the panel employed to configurate a new similarity measure based
 * on a previous one. 
 */
export class SimConfigurator {

    /**
     * The similarity panel where the similarity configurator is created
     */
    similarityPanel: SimilarityPanel;

    /**
     * Input elements for visualizing attribute weights
     */
    attInputElements: Array<HTMLInputElement>;

    /**
     * Weights for attributes
     */
    attWeights: Array<number>;

    /**
     * Sliders for modifying attribute weights
     */
    attRangeElements: Array<HTMLInputElement>;

    /**
     * True if the similarity values must be recalculated
     */
    recalculated: boolean;

    /**
     * True if the Similarity configuration panel is activated
     */
    started: boolean;

    /**
     * A similarity DAO
     */
    //simDAO: SimilarityDAO;

    /**
     * The similarity data that might be modified using this panel
     */
    oldSimData: SimilarityData;

    /**
     * Constructor
     * @param parentSimilarityPanel Similarity panel that will contain this SimConfigurator
     */
    constructor(parentSimilarityPanel:SimilarityPanel) {
        this.similarityPanel = parentSimilarityPanel;
        this.attInputElements = [];
        this.attWeights = [];
        this.attRangeElements = [];
        let configPanel = document.getElementById("similarity-configuration");
        this.recalculated = false;
        if (configPanel) {
            configPanel.addEventListener("hidden.bs.modal", (e) => {
                // HACK: Bootstrap fires hide.bs.modal twice
                // This way we avoid to recalculate everything twice
                if (!this.recalculated){
                    this.recalculateSimilarity(); 
                    this.recalculated = true;    
                }           
            });
            configPanel.addEventListener("show.bs.modal", (e) => {
                this.recalculated = false;
            });
        }
        this.started = false;
    };

    /**
     * Initializes the Similarity Configuration panel
     * @param simData The similarity data that might be modified
     */
    init(simData: SimilarityData): void {        
        this.oldSimData = simData;
        let oldSimDescription = simData.similarityDescription;
        let theForm = document.getElementById("similarity-configuration-form");
        if (theForm){
            theForm.innerHTML = "";
            let numAtts = 0;
            // Create a row for each attribute
            for (let [attName, simFunction] of Object.entries(oldSimDescription.localSim)) {
                let aRow = document.createElement("div")
                aRow.classList.add("row", "align-items-center");
                let attRowElement = TemplateManager.generate(formAttributeRow, { attName: attName, weightValue: simFunction.weight });
                aRow.innerHTML = attRowElement;
                theForm.appendChild(aRow);
                let inputWeightValue = document.getElementById(`input-att-${attName}`) as HTMLInputElement;
                if (inputWeightValue){
                    inputWeightValue.value = (simFunction.weight).toFixed(2);
                    inputWeightValue.addEventListener('input', (event) => {
                        let wValue = Math.min(Math.max(parseFloat(inputWeightValue.value), 0), 1)
                        inputWeightValue.value = wValue.toFixed(2) ;
                        rangeWeightValue.value = inputWeightValue.value;
                        //this.redistributeValues(elemIndex, rangeWeightValue.value);
                    });
                }
                let rangeWeightValue = document.getElementById(`range-att-${attName}`) as HTMLInputElement;
                if (rangeWeightValue){
                let elemIndex = numAtts;
                    rangeWeightValue.addEventListener('input', (event) => {
                        let wValue = Math.min(Math.max(parseFloat(rangeWeightValue.value), 0), 1);
                        rangeWeightValue.value = wValue.toFixed(2);
                        inputWeightValue.value = rangeWeightValue.value;
                        //this.redistributeValues(elemIndex, rangeWeightValue.value);
                    });
                }
                this.attInputElements[numAtts] = inputWeightValue;
                this.attRangeElements[numAtts] = rangeWeightValue;
                this.attWeights[numAtts] = simFunction.weight;
                numAtts++;
            }
            this.started = true;
        }        
    }

    /**
     * Recalculate the similarity data using the weights modified by the user
     */
    recalculateSimilarity(){
        // Avoid multiple calls
        if (this.started){
            let newSimilarityName = "";
            let oldSimDescription = this.oldSimData.similarityDescription;
            let newDescription = JSON.parse(JSON.stringify(oldSimDescription));
            let modified = false;
            for (let [attName, simFunction] of Object.entries(oldSimDescription.localSim)) {
                let weightInput = document.getElementById(`input-att-${attName}`) as HTMLInputElement;
                if (weightInput){
                    let newWeight = parseFloat(weightInput.value);
                    if (newWeight>0){
                        newSimilarityName+=attName+(newWeight*100).toFixed(0);
                        newDescription.localSim[attName].weight = newWeight;
                        modified = modified || (newWeight !== oldSimDescription.localSim[attName].weight);
                    } else {
                        delete newDescription.localSim[attName];
                    }
                }
            }
            // Only recalculate if any weight has been modified 
            if (newSimilarityName !== "" && modified){
                theController.showLoadingOverlay();
                // launch using setTimeout to display the overlay
                setTimeout(() => {
                    let newSimData:SimilarityData = SimilarityComputing.run(this.oldSimData.similarities, newDescription);
                    theSimilarityDAO.addSimilarityData(newSimilarityName, newSimData);
                    this.similarityPanel.addSimilarityFunctionToDropdown(newSimilarityName, true);
                    theController.hideLoadingOverlay();
                }, 100);
            }
        }

    }

    // redistributeValues(indexInputChanged, newValue){
    //     newValue = parseFloat(newValue);
    //     let oldValue = this.attWeights[indexInputChanged];
    //     let diff = oldValue-newValue;

    //     let delta = diff / (this.attWeights.length - 1);
    //     delta = Math.round(delta * 1e2) / 1e2;
    //     let plausibleWeights = this.attWeights.filter((weight) => (weight + delta>=0) && (weight +delta <=1));
    //     delta = diff / (plausibleWeights.length - 1);
    //     delta = Math.round(delta * 1e2) / 1e2;

    //     this.attWeights[indexInputChanged] = newValue;
    //     diff = Math.abs(diff);
    //     for (let i = 0; i < this.attInputElements.length; i++ ){
    //         if (i===indexInputChanged){
    //             continue;
    //         } else { 
    //             let aNewWeight = this.attWeights[i] + delta;
    //             aNewWeight = Math.round(aNewWeight * 1e2) / 1e2;
    //             if ((aNewWeight > 1) || (aNewWeight < 0))
    //                 continue;
    //             if (aNewWeight>1){
    //                 diff -= (1 - this.attWeights[i]);
    //                 aNewWeight =1.0;
    //             } else if (aNewWeight < 0) {
    //                 diff -= this.attWeights[i];
    //                 aNewWeight = 0.0;
    //             }
    //             else{
    //                 diff-=Math.abs(delta);
    //             }
    //             this.attWeights[i] = aNewWeight;
    //             this.attInputElements[i].value = aNewWeight;
    //             this.attRangeElements[i].value = aNewWeight;
    //         }
    //     }     

    // }


}
