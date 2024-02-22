import Handlebars from "handlebars";

const itemRowSelectorButton = '#heatmap-filter-btn-row';
const itemColSelectorButton = '#heatmap-filter-btn-col';
const itemRowPrefix = "item-row";
const itemColPrefix = "item-col"
const idName = "-id";

const basicAtributeTemplate = `
    <td class="col-4">
        {{#if theValue}}
        {{theValue}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const colorAttributeTemplate = `
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

const imageAttributeTemplate = `
    <td class="col-4">
        <img class="img-fluid" src="{{theValue}}"/>
    </td>
`;
const templates = {
    "string": basicAtributeTemplate,
    "number": basicAtributeTemplate,
    "Image": imageAttributeTemplate,
    "ColorList": colorAttributeTemplate
}

const maxSize = 60;



export class TableComparator {
    constructor(allAtts, simDescription, attId) {

        this.remainingAtts = {};
        this.simDescription = simDescription;
        let listAttsInSim = simDescription? Object.keys(simDescription.localSim) : null;
        this.simAtts = {};
        this.attId = attId;
        let table = document.querySelector("#item-comparator tbody");
        let tableContent = document.createElement("tbody");
        tableContent.classList.add("table-group-divider");

        if (listAttsInSim){
            for (let attName of listAttsInSim) {
                if (attName === attId)
                    continue;
                this.simAtts[attName] = allAtts[attName]; 
                let weight = simDescription.localSim[attName].weight;
                const rowTemplate = `
                    <tr data-att-name="${attName}">
                        <td class="col-2">
                            <div class="att-cell">
                                <div class="att-name">${attName}</div>
                                <div class="att-weight" data-weight="${weight}"></div> 
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
                    </tr>`
                const node = document.createElement('template');
                node.innerHTML = rowTemplate;
                const result = node.content.children[0];
                //result.classList.add("table-primary");
                tableContent.appendChild(result);
            }
        }

        for (let attName of Object.keys(allAtts)) {
            if (attName === attId)
                continue;
            if (this.simAtts && attName in this.simAtts)
                continue;
            this.remainingAtts[attName] = allAtts[attName];
            const rowTemplate = `
                <tr data-att-name="${attName}">
                        <td class="col-2">
                            <div class="att-cell">
                                <div class="att-name">${attName}</div>
                                <div class="att-weight" data-weight=""></div> 
                            </div>  
                        </td>
                        <td class="col-4 item-row-cell">
                        </td>
                        <td class="col-2">
                            <div class="att-cell">
                            </div>
                            
                        </td>
                        <td class="col-4 item-col-cell">
                        </td>
                </tr>`
            const node = document.createElement('template');
            node.innerHTML = rowTemplate;
            const result = node.content.children[0];
            tableContent.appendChild(result);
        }
        table.replaceWith(tableContent);

        this.attTemplates = {};
        this.mockItem = {};
        for (const [attName, attType] of Object.entries(allAtts)) {
            if (attName === this.attId)
                continue;
            this.attTemplates[attName] = Handlebars.compile(templates[attType]);
            this.mockItem[attName] = this._createPlaceholderForType(attType, attName);
        }
        this._populateWeights();
    }

    _createPlaceholderForType(attType, attName) {
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

    _changeItem(id, item, selector) {
        this._changeItemId(id, selector + idName);
        for (let att of Object.keys(this.simAtts)) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this._createItemElement(att, item[att]);
            if (selector.search("row") != -1) {
                comparatorRow[1].innerHTML = itemElement;
            } else {
                comparatorRow[3].innerHTML = itemElement;
            }
        }
        for (let att of Object.keys(this.remainingAtts)) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this._createItemElement(att, item[att]);
            if (selector.search("row") != -1) {
                comparatorRow[1].innerHTML = itemElement;
            } else {
                comparatorRow[3].innerHTML = itemElement;
            }
        }
    }

    _createItemElement(attName, attValue) {
        let elemTemplate = this.attTemplates[attName];
        if (elemTemplate) {
            return elemTemplate({ theValue: attValue })
        }
        else
            return "";
    }

    _changeItemId(newId, selector) {
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

    _changeRowItem(id, item, hideFilterButton) {
        if (item) {
            let selector = '#' + itemRowPrefix;
            this._changeItem(id, item, selector);
        }
    }

    _changeColItem(id, item, hideFilterButton) {
        if (item) {
            this._changeItem(id, item, '#' + itemColPrefix);
        }
    }

    changeRowItem(id, item) {
        this._changeRowItem(id, item, false);
    }

    changeColItem(id, item) {
        this._changeColItem(id, item, false);
    }

    resetItems() {
        this._changeRowItem("id", this.mockItem, true);
        this._changeColItem("id", this.mockItem, true);
        this.updateSimilarityValue(null, null);
    }

    resetColItem() {
        this._changeColItem("id", this.mockItem, true);
        this.updateSimilarityValue(null, null);
    }

    resetRowItem() {
        this._changeRowItem("id", this.mockItem, true);
        this.updateSimilarityValue(null, null);
    }

    updateSimilarityValue(newSimValue, color) {
        let simValueElem = document.getElementById("item-sim-value");
        if (simValueElem) {
            if (newSimValue !== null) {
                simValueElem.innerHTML = parseFloat(newSimValue.global).toFixed(3);
                for (let [localAtt, localValue] of Object.entries(newSimValue.local)) {
                    this._updateLocalSimilarity(localAtt, localValue);
                }
            } else {
                simValueElem.innerHTML = "Similarity";
            }
        }
        if (color !== null) {
            simValueElem.parentElement.style.backgroundColor = color;
        } else {
            simValueElem.parentElement.style.backgroundColor = ""
        }
    }

    _updateLocalSimilarity (attName, value) {
        let valueElem = document.querySelector(`tr[data-att-name=${attName}] .att-value`);
        if (valueElem) {
            valueElem.innerHTML = value.toFixed(3);
        }
    }

    _populateWeights() {
        let weights = document.querySelectorAll("#item-comparator .att-weight");
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

