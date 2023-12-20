import Handlebars from "handlebars";
import { daoItems } from './mockdata';

const basicAtributeTemplate = `
    <td class="col-5">
        {{aString}}
    </td>
`;

const colorAttributeTemplate = `
    <td class="col-5">
        {{#each Color}}
        {{#with this}}
        <div class="box" aria-labelledby="color-label" style="background-color: rgb({{rgb}});"></div>
        <div role="tooltip" id="color-label">{{colorName}}</div>
        {{/with}}
        {{/each}}
    </td>
`;

const imageAttributeTemplate = `
    <td class="col-5">
        <img class="img-fluid" src="{{image}}"/>
    </td>
`;

const mockItem = {
    _id: "Item Id",
    title: "Item title",
    author: "Item author",
    year: "Item year",
    color: [],
    image: "./images/placeholder.jpg"
}

const itemRowSelectorButton = '#heatmap-filter-btn-row';
const itemColSelectorButton = '#heatmap-filter-btn-col';
const itemRowPrefix  = "item-row";
const itemColPrefix = "item-col"
const idName = "-id";

const basicAtts = ["title", "author", "year", "Color", "image"];
class ItemLoader {

    constructor() {
        this.basicTemplate = Handlebars.compile(basicAtributeTemplate);
        this.colorTemplate = Handlebars.compile(colorAttributeTemplate);
        this.imageTemplate = Handlebars.compile(imageAttributeTemplate);
    }

    setController(aController) {
        this.controller = aController;
    }

    _changeItemId (newId, selector) {
        let idContainer = document.querySelector(selector);
        if (idContainer){
            idContainer.innerHTML = newId
        }
    }
    _changeItem(item, selector) {
        this._changeItemId(item._id, selector + idName);

        for (let att of basicAtts) {
            let comparatorRow = document.querySelectorAll(`tr[data-att-name=${att}] td`);
            let itemElement = this.basicTemplate({ aString: item[att] });
            if (att==="Color") {
                itemElement = this.colorTemplate({ Color: item[att] })
            }
            if (att==="image") {
                itemElement = this.imageTemplate({ image: item[att] })
            }

            if (selector.search("row") != -1) {
                comparatorRow[0].innerHTML = itemElement;
            } else {
                comparatorRow[2].innerHTML = itemElement;
            }
        }
    }

    _createHandlebars(anArtWork) {
        let result = this.templateRow(anArtWork);
        return result;
    }

    _changeRowItem(item, hideFilterButton) {  
        if (item){
            let selector = '#' + itemRowPrefix;
            this._changeItem(item, selector);
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

    _changeColItem(item, hideFilterButton) {
        if (item){
            this._changeItem(item, '#'+itemColPrefix);
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

    _updateFilterButton(theButton, itemName, itemId, hideIt){
        theButton.innerHTML = itemName;
        theButton.setAttribute('data-id', itemId);
        if (hideIt) {
            theButton.classList.add("disabled");
        } else {
            theButton.classList.remove("disabled");
        }
        theButton.addEventListener('click', (event) => {
            let clickdItemId = theButton.getAttribute("data-id");
            if (clickdItemId) {
                this.controller.filterByItemId(clickdItemId);
            }
        });
    }

    changeRowItemById(id) {
        this._changeRowItem(daoItems.getItemById(id), false);
    }

    changeColItemById(id) {
        this._changeColItem(daoItems.getItemById(id), false);
    }

    resetItems() {
        this._changeRowItem(mockItem, true);
        this._changeColItem(mockItem, true);
        this.updateSimilarityValue(null, null);
    }

    resetColItem() {
        this._changeColItem(mockItem, true);
        this.updateSimilarityValue(null, null);
    }

    resetRowItem() {
        this._changeRowItem(mockItem, true);
        this.updateSimilarityValue(null, null);
    }

    updateSimilarityValue(newSimValue, color){
        let simValueElem = document.getElementById("item-sim-value");
        if (simValueElem){
            if (newSimValue !== null){
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
export const itemLoader = new ItemLoader();