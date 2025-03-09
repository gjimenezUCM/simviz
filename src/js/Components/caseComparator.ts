
import { SimilarityConfiguration, SimilarityValue, StringStringObject } from "../types/simvizTypes";
import TemplateManager from "../utils/templateManager";
import { theController } from "../controller";

/**********************************************************************
 * CSS Selectors for the main elements of the table comparator
 */
const itemRowSelectorButton = '#heatmap-filter-btn-row';
const itemColSelectorButton = '#heatmap-filter-btn-col';
const itemRowPrefix = "item-row";
const itemColPrefix = "item-col"
const idName = "-id";

/**********************************************************************
 * Templates for creating the table
 */
const basicAtributeTemplate:string = `
    <td class="col-4">
        {{#if theValue}}
        {{theValue}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const colorRGBListAttributeTemplate:string = `
    <td class="col-4">
        {{#if theValue}}
            {{#each theValue}}
                <div class="box" title="rgb({{this}})" aria-labelledby="color-label" style="background-color: rgb({{this}});"></div>
            {{/each}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const colorAttributeTemplate: string = `
    <td class="col-4">
        {{#if theValue}}
            <div class="box" aria-labelledby="color-label" title={{theValue}} style="background-color: {{theValue}};"></div>
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

const taxonomyAttributeTemplate:string = `
    <td class="col-4">
        {{#if theValue}}
        <a class="taxonomy-label" href="#" data-label="{{theValue}}">{{theValue}}</a>
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
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

/**
 * Max size in pixels of the bar that visually represents a weight
 */
const MAX_WEIGHTBAR_SIZE_PX = 60;

/**
 * The class that creates the table employed to compare cases in SimViz. It uses Handlebars to
 * create the HTML representation of the table.
 * The table shows all the attributes in a case. When a similarity function is selected,
 * it includes additional information about the cases that are part of the similarity
 * function, adding a bar that represents the weight of this attribute in the similarity function
 */
export class CaseComparator {

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
    private simDescription: SimilarityConfiguration | null;

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
    constructor(allAtts: StringStringObject, simDescription: SimilarityConfiguration | null, attId: string) {
        this.remainingAtts = {};
        this.simDescription = simDescription;
        this.simAtts = {};
        this.attId = attId;
        let table = document.querySelector("#case-comparison-panel tbody");

        // Create the table
        if (table) {
            this.registerTemplateTypes();
            let tableContent = document.createElement("tbody");
            tableContent.classList.add("table-group-divider");
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

        // Create the empty case employed when a case is not selected
        this.emptyCase = {};
        for (const [attName, attType] of Object.entries(allAtts)) {
            // Ignore attribute id because it appear in the table header
            if (attName === this.attId)
                continue;
            this.emptyCase[attName] = this.createPlaceholderForType(attType);
        }

        // Finally, create the weight bars using the information about the weights
        this.populateWeights();
    }    

    /**
     * Update the case that represents a row on the heatmap 
     * @param id Case unique id
     * @param item Case content
     */
    updateRowCase(id: string, item: Object | null ) {
        // It goes on the left column on the table
        this.updateLeftColCase(id, item);
    }

    /**
     * Update the case that represents a column on the heatmap 
     * @param id Case unique id
     * @param item Case content
     */
    updateColCase(id: string, item: Object | null ) {
        // It goes on the right column on the table
        this.updateRightColCase(id, item);
    }

    /**
     * Reset the table and write empty cases
     */
    resetTable() {
        this.updateLeftColCase("id", this.emptyCase);
        this.updateRightColCase("id", this.emptyCase);
        this.updateSimilarityValue(null, null);
    }

    /**
     * Reset and display an empty case for the one that represents a row on the heatmap
     */
    resetRowItem() {
        this.updateLeftColCase("id", this.emptyCase);
        this.updateSimilarityValue(null, null);
    }

    /**
     * Reset and display an empty case for the one that represents a column on the heatmap
     */
    resetColItem() {
        this.updateRightColCase("id", this.emptyCase);
        this.updateSimilarityValue(null, null);
    }

    /**
     * Update the similarity value between two cases. It changes the global similarity value
     * on the header and the local similarity values
     * @param newSimValue An object that contains the similarity value (with global and local similarity values)
     * @param color The color employed for the global similarity value
     */
    updateSimilarityValue(newSimValue:SimilarityValue | null, color:string | null) {
        let simValueElem = document.getElementById("item-sim-value");
        if (simValueElem) {
            if (newSimValue !== null) {
                simValueElem.innerHTML = newSimValue.value.toFixed(3);
                for (let [localAtt, localValue] of Object.entries(newSimValue.attributes)) {
                    this.updateLocalSimilarity(localAtt, localValue);
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
        // run post update functions
        this.postUpdate();
    }

    /**
     * Tasks to do after updating the similarityValue
     */
    private postUpdate() {
        // Update taxonomy links for taxonomy atributes
        let taxonomyLinks = document.querySelectorAll("#case-comparison-panel a.taxonomy-label");
        // Suscribe to click events on links to taxonomyLabels
        for (let link of taxonomyLinks){
            link.addEventListener("click", (event) => {
                if (event.currentTarget){
                    let label = (<HTMLElement>event.currentTarget).getAttribute("data-label");
                    if (label) {
                        theController.focusOnTaxonomyNode(label);
                    }
                }
            })
        }
    }

    /**
     * Register the templates in the template manager for the common attribute types
     */
    private registerTemplateTypes(){
        TemplateManager.registerTemplate("string", basicAtributeTemplate);
        TemplateManager.registerTemplate("number", basicAtributeTemplate);
        TemplateManager.registerTemplate("Image", imageAttributeTemplate);
        TemplateManager.registerTemplate("ColorRGBList", colorRGBListAttributeTemplate);
        TemplateManager.registerTemplate("Color", colorAttributeTemplate);
        TemplateManager.registerTemplate("Taxonomy", taxonomyAttributeTemplate);
    }

    /**
     * Create an empty row in the table
     * @param table HTML element that represents the table
     * @param rowData An object with the data that must be included in the row (attribute name and weight, if needed)
     */
    private createRowElement(table: HTMLElement, rowData: Object): void {
        //const rowElement = Handlebars.compile(rowTemplate);
        const rowContent = TemplateManager.generate(rowTemplate, rowData);
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
    private createPlaceholderForType(attType: string) {
        let placeholder = "";
        switch (attType) {
            case ("Image"):
                placeholder = "./images/placeholder.jpg";
                break;
            case ("Color"):
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
    private updateCaseInColumn(id: string, caseContent: Object, selector: string): void {
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
    private createAttributeValueElement(attName: string, attValue: any): string {
        let result = ""
        if (this.simAtts[attName]) {
            result = TemplateManager.generateWithRegisteredTemplate(this.simAtts[attName], { theValue: attValue });
        }

        if (this.remainingAtts[attName]) {            
            result = TemplateManager.generateWithRegisteredTemplate(this.remainingAtts[attName], { theValue: attValue });
        }
        return result;
    }

    /**
     * Change the header id with a new id
     * @param newId The new Id
     * @param selector String selector for the header
     */
    private updateHeaderWithId(newId: string, selector: string): void {
        let idContainer = document.querySelector(selector + " .item-id-value");
        if (idContainer) {
            idContainer.innerHTML = newId;
        }
        let idButton = document.querySelector(selector + " button");
        if (idButton) {
            newId = newId == 'id' ? "" : newId;
            idButton.setAttribute("data-item-id", newId);
        }
    }

    /**
     * Modify the case  on left column of the table
     * @param id Case unique id
     * @param item Case content
     */
    private updateLeftColCase(id: string, item: Object | null) {
        if (item) {
            let selector = '#' + itemRowPrefix;
            this.updateCaseInColumn(id, item, selector);
        }
    }

    /**
     * Modify the case  on the right column of the table
     * @param id Case unique id
     * @param item Case content
     */
    private updateRightColCase(id: string, item: Object | null) {
        if (item) {
            this.updateCaseInColumn(id, item, '#' + itemColPrefix);
        }
    }

    /**
     * Update the local similarity valu for an attribute (by name)
     * @param attName Name of the attribute
     * @param value Local similarity value for the attribute
     */
    private updateLocalSimilarity (attName:string, value:number) {
        // Just update if attName is part of the local similarity attributes
        if (attName in this.simAtts){
            // The row of this attribute is characterized by a data attribute with the attribute name
            let valueElem = document.querySelector(`tr[data-att-name=${attName}] .att-value`);
            if (valueElem) {
                valueElem.innerHTML = value.toFixed(3);
            }
        }
    }

    /**
     * Create the bars for the weights 
     */
    private populateWeights() {
        let weights = document.querySelectorAll("#case-comparison-panel .att-weight");
        for (let w of weights) {
            let stringWeightValue = w.getAttribute("data-weight");
            let frameBar = document.createElement("div");
            frameBar.style.width = `${MAX_WEIGHTBAR_SIZE_PX + 2}px`;
            frameBar.style.border = "1px solid black"
            w.appendChild(frameBar);
            let weightBar = document.createElement("div");
            weightBar.classList.add("att-weight-bar");
            if (stringWeightValue) {
                let weightValue = parseFloat(stringWeightValue);
                weightBar.innerHTML = `${(weightValue * 100).toFixed(2)}%`
                weightBar.style.width = `${MAX_WEIGHTBAR_SIZE_PX * weightValue}px`;
                frameBar.appendChild(weightBar);
            }
        }
    }
}