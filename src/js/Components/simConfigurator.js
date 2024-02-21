import Handlebars from "handlebars";
import { SimilarityComputing } from '../similarityComputing';
import { theController } from "../controller";

const formAttributeRow = `
        <div class="col-4 text-end"><label for="input-att-{{attName}}" class="form-label">{{attName}}</label></div>
        <div class="col-3"><input class="form-control" id="input-att-{{attName}}" value={{weightValue}} aria-describedby="att-{{attName}}-weight"></div>
        <div class="col-3"><input type="range" class="form-range" min="0" max="1" step="0.05" value={{weightValue}} id="range-att-{{attName}}"></div>`;

export class SimConfigurator {
    constructor(parentSimilarityPanel) {
        this.similarityPanel = parentSimilarityPanel;
        this.attConfiguratorTemplate = Handlebars.compile(formAttributeRow);
        this.attInputElements = [];
        this.attWeights = [];
        this.attRangeElements = [];
        this.totalWeights = 0.0;
        let configPanel = document.getElementById("similarity-configuration");
        this.recalculated = false;
        if (configPanel) {
            configPanel.addEventListener("hidden.bs.modal", (e) => {
                theController.showLoadingOverlay();
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

    init(simDao, simData) {        
        this.simDao = simDao;
        this.simData = simData;
        this.oldSimDescription = simData.similarityDescription;
        let theForm = document.getElementById("similarity-configuration-form");
        theForm.innerHTML = "";
        let numAtts= 0;
        for (let [attName, simFunction] of Object.entries(this.oldSimDescription.localSim)) {
            let aRow = document.createElement("div")
            aRow.classList.add("row", "align-items-center");
            let attRowElement = this.attConfiguratorTemplate({ attName: attName, weightValue: simFunction.weight });
            aRow.innerHTML = attRowElement;
            theForm.appendChild(aRow);
            let inputWeightValue = document.getElementById(`input-att-${attName}`);
            inputWeightValue.value = simFunction.weight;
            let rangeWeightValue = document.getElementById(`range-att-${attName}`);
            let elemIndex = numAtts;
            rangeWeightValue.addEventListener('input', (event) => {
                rangeWeightValue.value = Math.min(Math.max(rangeWeightValue.value, 0), 1);
                inputWeightValue.value = rangeWeightValue.value;
                //this.redistributeValues(elemIndex, rangeWeightValue.value);
            });
            inputWeightValue.addEventListener('input', (event) => {
                inputWeightValue.value = Math.min(Math.max(inputWeightValue.value, 0), 1);
                rangeWeightValue.value = inputWeightValue.value;
                //this.redistributeValues(elemIndex, rangeWeightValue.value);
            });
            this.attInputElements[numAtts] = inputWeightValue;
            this.attRangeElements[numAtts] = rangeWeightValue;
            this.attWeights[numAtts] = simFunction.weight;
            this.totalWeights += simFunction.weight;
            numAtts++;
        }
        this.started = true;
    }

    recalculateSimilarity(){
        if (this.started){
            let newSimilarityName = "";
            let newDescription = JSON.parse(JSON.stringify(this.oldSimDescription));
            let modified = false;
            for (let [attName, simFunction] of Object.entries(this.oldSimDescription.localSim)) {
                let weightInput = document.getElementById(`input-att-${attName}`);
                if (weightInput){
                    let newWeight = parseFloat(weightInput.value);
                    if (newWeight>0){
                        newSimilarityName+=attName+(newWeight*100).toFixed(0);
                        newDescription.localSim[attName].weight = newWeight;
                        modified = modified || (newWeight !== this.oldSimDescription.localSim[attName].weight);
                    } else {
                        delete newDescription.localSim[attName];
                    }
                }
            }
            if (newSimilarityName !== "" && modified){
                let simComputing = new SimilarityComputing(this.simData, newDescription)
                setTimeout(() => {
                    simComputing.run();
                    let newSimFunctionDataObject = {
                        similarityDescription: newDescription,
                        similarityData: simComputing.newSimilarityData
                    };
                    this.simDao.addSimilarityData(newSimilarityName, newSimFunctionDataObject);
                    this.similarityPanel.addSimilarityFunctionToDropdown(newSimilarityName, true);
                    theController.hideLoadingOverlay();
                }, 100);
            }
        }

    }

    redistributeValues(indexInputChanged, newValue){
        newValue = parseFloat(newValue);
        let oldValue = this.attWeights[indexInputChanged];
        let diff = oldValue-newValue;

        let delta = diff / (this.attWeights.length - 1);
        delta = Math.round(delta * 1e2) / 1e2;
        let plausibleWeights = this.attWeights.filter((weight) => (weight + delta>=0) && (weight +delta <=1));
        delta = diff / (plausibleWeights.length - 1);
        delta = Math.round(delta * 1e2) / 1e2;

        this.attWeights[indexInputChanged] = newValue;
        diff = Math.abs(diff);
        for (let i = 0; i < this.attInputElements.length; i++ ){
            if (i===indexInputChanged){
                continue;
            } else { 
                let aNewWeight = this.attWeights[i] + delta;
                aNewWeight = Math.round(aNewWeight * 1e2) / 1e2;
                if ((aNewWeight > 1) || (aNewWeight < 0))
                    continue;
                if (aNewWeight>1){
                    diff -= (1 - this.attWeights[i]);
                    aNewWeight =1.0;
                } else if (aNewWeight < 0) {
                    diff -= this.attWeights[i];
                    aNewWeight = 0.0;
                }
                else{
                    diff-=Math.abs(delta);
                }
                this.attWeights[i] = aNewWeight;
                this.attInputElements[i].value = aNewWeight;
                this.attRangeElements[i].value = aNewWeight;
            }
        }     

    }


}
