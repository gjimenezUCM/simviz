import Handlebars from "handlebars";
import { daoItems } from './mockdata';

const itemTemplateRow = `
    <div class="item d-flex flex-row-reverse align-items-center">
        {{#if image}}
        <div class="p-5">
        <img class="img-fluid" src="{{image}}"/>
        </div>
        {{/if}}
        <div class="item-desc-table flex-grow-1 p-5 align-self-start">
            <table class="table table-striped">
            <tbody>
            <tr>
                <td class="name">Title</td>
                <td class="value">{{tittle}}</td>
            </tr>
            <tr>
                <td class="name">Author</td>
                <td class="value">{{author}}</td>
            </tr>
            <tr>
                <td class="name">Year</td>
                <td class="value">{{year}}</td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
`;

const itemTemplateCol = `
    <div class="item d-flex align-items-center">
        {{#if image}}
        <div class="p-5">
        <img class="img-fluid" src="{{image}}"/>
        </div>
        {{/if}}
        <div class="item-desc-table flex-grow-1 p-5 align-self-start">
            <table class="table table-striped">
            <tbody>
            <tr>
                <td class="name">Title</td>
                <td class="value">{{tittle}}</td>
            </tr>
            <tr>
                <td class="name">Author</td>
                <td class="value">{{author}}</td>
            </tr>
            <tr>
                <td class="name">Year</td>
                <td class="value">{{year}}</td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
`;

const mockItem = {
    _id: "Item Id",
    tittle: "Item title",
    image: "./images/placeholder.jpg"
}

const itemRowSelectorButton = '#heatmap-filter-btn-row';
const itemColSelectorButton = '#heatmap-filter-btn-col';
class ItemLoader {

    constructor() {
        this.templateRow = Handlebars.compile(itemTemplateRow);
        this.templateCol = Handlebars.compile(itemTemplateCol);
    }

    setController(aController) {
        this.controller = aController;
    }

    _changeItem(item, selector) {
        let itemElement = null;
        if (selector.search("row")!=-1){
            itemElement = this.templateRow(item);
        } else {
            itemElement = this.templateCol(item);
        }
        let colElement = document.querySelector(selector);
        colElement.innerHTML = itemElement;
    }

    _createHandlebars(anArtWork) {
        let result = this.templateRow(anArtWork);
        return result;
    }
    // _createItemElement(anArtWork) {
    //     let attribs = ["id", "tittle", "Object", "author", "year", "Materials", "Colour", "ColourRGB", "image", "Object group"];
    //     let bodyNode = document.createElement('tbody');
    //     bodyNode.classList.add("artwork");

    //     for (let att of attribs) {
    //         if (att === "ColourRGB") {
    //             continue;
    //         }
    //         let rowNode = document.createElement('tr');
    //         let nameNode = document.createElement('td');
    //         nameNode.classList.add("name");
    //         nameNode.innerHTML = att;
    //         let valueNode = document.createElement('td');
    //         valueNode.classList.add("value");

    //         if (att === "Colour") {
    //             let i = 0;
    //             for (let col of anArtWork[att]) {
    //                 let squareColourNode = document.createElement('div');
    //                 squareColourNode.classList.add("box");
    //                 valueNode.appendChild(squareColourNode);
    //                 let colour = `rgb(${anArtWork["ColourRGB"][i]})`;
    //                 squareColourNode.style['background-color'] = colour;
    //                 valueNode.appendChild(squareColourNode);
    //                 let colourText = document.createTextNode(col);
    //                 valueNode.appendChild(colourText);
    //                 i++;
    //             }
    //         }

    //         else if (att === "image") {
    //             let imageNode = document.createElement("img");
    //             imageNode.setAttribute("src", anArtWork[att]);
    //             valueNode.appendChild(imageNode);
    //         }
    //         else {
    //             valueNode.innerHTML = anArtWork[att];
    //         }

    //         rowNode.appendChild(nameNode);
    //         rowNode.appendChild(valueNode);

    //         bodyNode.appendChild(rowNode);
    //     }

    //     let artworkNode = document.createElement('table');
    //     artworkNode.classList.add("table");
    //     artworkNode.classList.add("table-striped");
    //     artworkNode.appendChild(bodyNode);
    //     return artworkNode;
    // } 

    _changeRowItem(item, hideFilterButton) {  
        if (item){
            this._changeItem(item, '#item-row');
            let filterBtn = document.querySelector(itemRowSelectorButton);
            this._updateFilterButton(filterBtn, item._id, item._id, hideFilterButton);
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
            this._changeItem(item, '#item-col');
            let filterBtn = document.querySelector(itemColSelectorButton);
            // Prevent errors during first initialization
            this._updateFilterButton(filterBtn, item._id, item._id, hideFilterButton);
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
            if (newSimValue){
                simValueElem.innerHTML = parseFloat(newSimValue).toFixed(3);
            } else {
                simValueElem.innerHTML = "Similarity";
            }
        }
        if (color) {
            simValueElem.parentElement.style.backgroundColor = color;
        } else {
            simValueElem.parentElement.style.backgroundColor = ""
        }
    }
}
export const itemLoader = new ItemLoader();