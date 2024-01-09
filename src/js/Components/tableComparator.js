import Handlebars from "handlebars";

const itemRowSelectorButton = '#heatmap-filter-btn-row';
const itemColSelectorButton = '#heatmap-filter-btn-col';
const itemRowPrefix = "item-row";
const itemColPrefix = "item-col"
const idName = "-id";

const basicAtributeTemplate = `
    <td class="col-5">
        {{theValue}}
    </td>
`;

const colorAttributeTemplate = `
    <td class="col-5">
        {{#each theValue}}
        {{#with this}}
        <div class="box" aria-labelledby="color-label" style="background-color: rgb({{rgb}});"></div>
        <div role="tooltip" id="color-label">{{colorName}}</div>
        {{/with}}
        {{/each}}
    </td>
`;

const imageAttributeTemplate = `
    <td class="col-5">
        <img class="img-fluid" src="{{theValue}}"/>
    </td>
`;
const templates = {
    "string": basicAtributeTemplate,
    "number": basicAtributeTemplate,
    "Image": imageAttributeTemplate,
    "ColorList": colorAttributeTemplate
}




export class TableComparator {
    constructor(allAtts, listAttsInSim, attId) {
        this.simAtts = {};
        this.remainingAtts = {};
        this.attId = attId;
        let table = document.querySelector("#item-comparer tbody");
        let tableContent = document.createElement("tbody");
        tableContent.classList.add("table-group-divider");

        for (let attName of Object.keys(allAtts)) {
            if (attName === attId)
                continue;
            const rowTemplate = `
                <tr data-att-name="${attName}">
                    <td class="col-5">
                    </td>
                    <td class="col-2">
                        <div class="att-cell d-flex flex-column">
                            <div class="att-header d-flex flex-row justify-content-center">
                                <div class="att-name">${attName}</div>
                                <div class="att-value"></div>
                            </div>
                            <div class="att-weight align-self-center" data-weight="0"></div>
                        </div>
                    </td>
                    <td class="col-5">
                    </td>
                </tr>`
            const node =  document.createElement('template');
            node.innerHTML = rowTemplate;
            const result = node.content.children[0];
            if (listAttsInSim && listAttsInSim.includes(attName)) {
                this.simAtts[attName] = allAtts[attName];
                result.classList.add("table-primary");
                tableContent.insertBefore(result, tableContent.children[0])
            }
            else {
                this.remainingAtts[attName] = allAtts[attName];
                tableContent.appendChild(result);
            }
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
    }

    _createPlaceholderForType(attType, attName) {
        let placeholder = "";
        switch(attType) {
            case ("Image"):
                placeholder= "./images/placeholder.jpg";
                break;
            case("Color"):
                placeholder = [];
                break;
            default:
                placeholder = "Item "+attName
        }
        return placeholder;
    } 

    _changeItem(id, item, selector) {
        this._changeItemId(id, selector + idName);
        for (let att of Object.keys(this.simAtts)) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this._createItemElement(att, item[att]);
            if (selector.search("row") != -1) {
                comparatorRow[0].innerHTML = itemElement;
            } else {
                comparatorRow[2].innerHTML = itemElement;
            }
        }
        for (let att of Object.keys(this.remainingAtts)) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this._createItemElement(att, item[att]);
            if (selector.search("row") != -1) {
                comparatorRow[0].innerHTML = itemElement;
            } else {
                comparatorRow[2].innerHTML = itemElement;
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
        let idContainer = document.querySelector(selector);
        if (idContainer) {
            idContainer.innerHTML = newId
        }
    }

    _changeRowItem(id, item, hideFilterButton) {
        if (item) {
            let selector = '#' + itemRowPrefix;
            this._changeItem(id, item, selector);
            // this._changeItem(item, '#item-row');
            // let filterBtn = document.querySelector(itemRowSelectorButton);
            // this._updateFilterButton(filterBtn, item._id, item._id, hideFilterButton);
        }

        // Prevent errors during first initialization
        // if (filterBtn) {
        //     if (hideFilterButton) {
        //         filterBtn.classList.add("disabled");
        //     } else {
        //         filterBtn.classList.remove("disabled");
        //     }
        // }
    }

    _changeColItem(id, item, hideFilterButton) {
        if (item) {
            this._changeItem(id, item, '#' + itemColPrefix);
            // let filterBtn = document.querySelector(itemColSelectorButton);
            // // Prevent errors during first initialization
            // this._updateFilterButton(filterBtn, item._id, item._id, hideFilterButton);
        }

        // if (filterBtn) {
        //     if (hideFilterButton) {
        //         filterBtn.classList.add("disabled");
        //     } else {
        //         filterBtn.classList.remove("disabled");
        //     }
        // }
    }

    setController(aController) {
        this.controller = aController;
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
                simValueElem.innerHTML = parseFloat(newSimValue).toFixed(3);
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
}

