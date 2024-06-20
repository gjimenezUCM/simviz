import Handlebars from "handlebars";
import { SimilarityDescription, SimilarityValue, StringStringObject } from "../types/simvizTypes";

const itemRowSelectorButton = '#heatmap-filter-btn-row';
const itemColSelectorButton = '#heatmap-filter-btn-col';
const itemRowPrefix = "item-row";
const itemColPrefix = "item-col"
const idName = "-id";

const basicAtributeTemplate:string = `
    <td class="col-4">
        {{#if theValue}}
        {{theValue}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const colorAttributeTemplate:string = `
    <td class="col-4">
        {{#if theValue}}
            {{#each theValue}}
                {{#with this}}
                <div class="box" aria-labelledby="color-label" style="background-color: rgb({{rgb}});"></div>
                {{/with}}
            {{/each}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const imageAttributeTemplate:string = `
    <td class="col-4">
        <img class="img-fluid" src="{{theValue}}"/>
    </td>
`;

const rowTemplate: string = `
    <tr data-att-name="{{attName}}">
        <td class="col-2">
            <div class="att-cell">
                <div class="att-name">{{attName}}</div>
                {{#if weight}}
                <div class="att-weight" data-weight="{{weight}}"></div> 
                {{else}}
                <div class="att-weight" data-weight=""></div>
                {{/if}}
            </div>  
        </td>
        <td class="col-4 item-row-cell">
        </td>
        <td class="col-2">
            <div class="att-cell">
                <div class="att-value"></div> 
            </div>                            
        </td>
        <td class="col-4 item-col-cell">
        </td>
    </tr>
`;

const templates: { [key:string]: string } = {
    "string": basicAtributeTemplate,
    "number": basicAtributeTemplate,
    "Image": imageAttributeTemplate,
    "ColorList": colorAttributeTemplate
}

const maxSize = 60;

/**
 * The class that creates the table employed to compare cases in SimViz. It uses Handlebars to
 * create the HTML representation of the table.
 * The table shows all the attributes in a case. When a similarity function is selected,
 * it includes additional information about the cases that are part of the similarity
 * function, adding a bar that represents the weight of this attribute in the similarity function
 */
export class TableComparator {

    /**
     * Attributes that are employed by a similarity function (name: type)
     */
    private simAtts: StringStringObject ;
    
    /**
     * The Attributes that are NOT employed by a similarity function (name: type)
     */
    private remainingAtts: StringStringObject;

    /**
     * The name of the attribute employed as unique id
     */
    private attId: string;

    /**
     * The description of the similarity function selected when the table is created
     */
    private simDescription: SimilarityDescription | null;

    /**
     * Templates employed for each case attribute
     */
    private attTemplates: { [k: string]: unknown };

    /**
     * A temporal empty case that is presented when no cases are selected
     */
    private emptyCase: StringStringObject;

    /**
     * Constructor
     * @param allAtts An object with all the attributes of the cases that will be presented in the table
     * @param simDescription The similarity function that will be presented. It can be null.
     * @param attId The attribute employed as unique id.
     */
    constructor(allAtts: StringStringObject, simDescription: SimilarityDescription | null, attId: string) {
        this.remainingAtts = {};
        this.simDescription = simDescription;
        this.simAtts = {};
        this.attId = attId;
        let table = document.querySelector("#item-comparator tbody");

        // Create the table
        if (table) {
            let tableContent = document.createElement("tbody");
            tableContent.classList.add("table-group-divider");
            const rowElement = Handlebars.compile(rowTemplate);
            // If the table is configured for a similarity function then we will start with the attributes
            // employed by the similarity function
            if (simDescription){
                let listAttsInSim = Object.keys(simDescription.localSim);
                for (let attName  of listAttsInSim) {
                    // Ignore attribute id because it appear in the table header
                    if (attName === attId)
                        continue;
                    this.simAtts[attName] = allAtts[attName]; 
                    let weight = simDescription ? simDescription.localSim[attName].weight: 0.0;
                    this.createRowElement(tableContent, { attName: attName, weight: weight });
                }
            }
            // Now add the attributes that are not part of the similarity function
            for (let attName of Object.keys(allAtts)) {
                // Ignore attribute id because it appear in the table header
                if (attName === attId)
                    continue;
                // Ignore attribute because it was previously added to the table
                if (this.simAtts && attName in this.simAtts)
                    continue;
                this.remainingAtts[attName] = allAtts[attName];
                this.createRowElement(tableContent, { attName: attName });
            }
            table.replaceWith(tableContent);
        }

        // Create the templates depending on the attribute type
        // and create the empty case employed when a case is not selected
        this.attTemplates = {};
        this.emptyCase = {};
        for (const [attName, attType] of Object.entries(allAtts)) {
            // Ignore attribute id because it appear in the table header
            if (attName === this.attId)
                continue;
            this.attTemplates[attName] = Handlebars.compile(templates[attType]);
            this.emptyCase[attName] = this.createPlaceholderForType(attType);
        }

        // Finally, create the weight bars using the information about the weights
        this._populateWeights();

    }

    /**
     * Create an empty row in the table
     * @param table HTML element that represents the table
     * @param rowData An object with the data that must be included in the row (attribute name and weight, if needed)
     */
    private createRowElement(table: HTMLElement, rowData: Object): void {
        const rowElement = Handlebars.compile(rowTemplate);
        const rowContent = rowElement(rowData);
        const node = document.createElement('template');
        node.innerHTML = rowContent;
        const result = node.content.children[0];
        table.appendChild(result);
    }

    /**
     * Return a string that represents a placeholder value depending on the attribute type
     * @param attType Type of the attribute
     * @returns The string employed as placeholder value for this attribute type
     */
    private createPlaceholderForType(attType:string ) {
        let placeholder = "";
        switch(attType) {
            case ("Image"):
                placeholder= "./images/placeholder.jpg";
                break;
            case("Color"):
                placeholder = '';
                break;
            default:
                placeholder = ''
        }
        return placeholder;
    } 

    /**
     * Modify a column of the table, updating it with the information about a case. 
     * Because the table is commonly updated due to a click on the heatmap, the first
     * column is characterized by a selector that contains the word "row",
     * and the second column, by a selector that contains the word "col",
     * @param id Case unique id
     * @param caseContent The content of this case
     * @param selector A string with the "row" or "col" word, which represents if the
     * first or the second column must be updated
     */
    private updateCaseInColumn(id:string, caseContent:Object, selector:string):void {
        // Update the table header with the case id
        this.updateHeaderWithId(id, selector + idName);

        // Choose the index to select the corresponding column where the case is displayed
        let colIndex = selector.search("row") != -1 ? 1 : 3;

        // Start with the attributes for the similarity function
        for (let att of Object.keys(this.simAtts)) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this.createAttributeValueElement(att, caseContent[<keyof Object>att]);
            comparatorRow[colIndex].innerHTML = itemElement;
        }

        // Then, continue with the remaining case attributes
        for (let att of Object.keys(this.remainingAtts)) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this.createAttributeValueElement(att, caseContent[<keyof Object>att]);
            comparatorRow[colIndex].innerHTML = itemElement;
        }
    }

    /**
     * Create a HTML string that represents a table cell for this attribute and value
     * @param attName Name of the attribute
     * @param attValue Value of the attribute
     * @returns A HTML string that represents a table cell for this attribute and value
     */
    private createAttributeValueElement(attName:string, attValue:any): string {
        // Select the template employed to create the attribute
        let elemTemplate:CallableFunction = this.attTemplates[attName] as CallableFunction;
        if (elemTemplate) {
            // Create the element using the handlebar compiled template
            return elemTemplate({ theValue: attValue })
        }
        else
            return "";
    }

    private updateHeaderWithId(newId:string, selector:string): void {
        let idContainer = document.querySelector(selector +" .item-id-value");
        if (idContainer) {
            idContainer.innerHTML = newId;
        }
        let idButton = document.querySelector(selector + " button");
        if (idButton){
            newId = newId=='id'?"":newId;
            idButton.setAttribute("data-item-id",newId);
        }
    }

    _changeRowItem(id: string, item: { [k: string]: string; }) {
        if (item) {
            let selector = '#' + itemRowPrefix;
            this.updateCaseInColumn(id, item, selector);
        }
    }

    _changeColItem(id: string, item: { [k: string]: string; }) {
        if (item) {
            this.updateCaseInColumn(id, item, '#' + itemColPrefix);
        }
    }

    changeRowItem(id: string, item: { [k: string]: string; }) {
        this._changeRowItem(id, item);
    }

    changeColItem(id: string, item: { [k: string]: string; }) {
        this._changeColItem(id, item);
    }

    resetItems() {
        this._changeRowItem("id", this.emptyCase);
        this._changeColItem("id", this.emptyCase);
        this.updateSimilarityValue(null, null);
    }

    resetColItem() {
        this._changeColItem("id", this.emptyCase);
        this.updateSimilarityValue(null, null);
    }

    resetRowItem() {
        this._changeRowItem("id", this.emptyCase);
        this.updateSimilarityValue(null, null);
    }

    updateSimilarityValue(newSimValue:SimilarityValue | null, color:string | null) {
        let simValueElem = document.getElementById("item-sim-value");
        if (simValueElem) {
            if (newSimValue !== null) {
                simValueElem.innerHTML = newSimValue.value.global.toFixed(3);
                for (let [localAtt, localValue] of Object.entries(newSimValue.value.local)) {
                    this._updateLocalSimilarity(localAtt, localValue);
                }
            } else {
                simValueElem.innerHTML = "Similarity";
            }
        }
        if (color !== null) {
            (simValueElem && simValueElem.parentElement)?  simValueElem.parentElement.style.backgroundColor = color : null;
        } else {
            (simValueElem && simValueElem.parentElement) ? simValueElem.parentElement.style.backgroundColor = "" : null;
        }
    }

    _updateLocalSimilarity (attName:string, value:number) {
        let valueElem = document.querySelector(`tr[data-att-name=${attName}] .att-value`);
        if (valueElem) {
            valueElem.innerHTML = value.toFixed(3);
        }
    }

    _populateWeights() {
        let weights = document.querySelectorAll("#item-comparator .att-weight");
        for (let w of weights) {
            let stringWeightValue = w.getAttribute("data-weight");
            let frameBar = document.createElement("div");
            frameBar.style.width = `${maxSize + 2}px`;
            frameBar.style.border = "1px solid black"
            w.appendChild(frameBar);
            let weightBar = document.createElement("div");
            weightBar.classList.add("att-weight-bar");
            if (stringWeightValue) {
                let weightValue = parseFloat(stringWeightValue);
                weightBar.innerHTML = `${(weightValue * 100).toFixed(2)}%`
                weightBar.style.width = `${maxSize * weightValue}px`;
                frameBar.appendChild(weightBar);
            }
        }
    }
}

