import Handlebars from "handlebars";
import { daoItems } from './mockdata';

const itemTemplate = `
    <div class="item" data-id="{{_id}}">
        <h1>{{tittle}}
            <button type="button" class="btn btn-primary heatmap-filter-btn">Show on heatmap</button>
        </h1>
        <div class="item-desc-table">
            <table class="table table-striped">
            <tbody>
            <tr>
                <td class="name">Id</td>
                <td class="value">{{_id}}</td>
            </tr>
            <tr>
            {{#if image}}
                <td class="name">image</td>
                <td class="value"><img class="img-fluid" src="{{image}}"/></td>
            {{/if}}
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

const itemRowSelectorButton = '#item-row button.heatmap-filter-btn';
const itemColSelectorButton = '#item-col button.heatmap-filter-btn';
class ItemLoader {

    constructor() {
        this.template = Handlebars.compile(itemTemplate);
    }

    setController(aController) {
        this.controller = aController;
    }

    _changeItem(item, selector) {
        let itemElement = this._createHandlebars(item);
        let colElement = document.querySelector(selector);
        colElement.innerHTML = itemElement;
        let filterButton = colElement.getElementsByClassName('heatmap-filter-btn');
        if (filterButton.length>0){
            filterButton[0].addEventListener('click', (event) => {
                let clickdItemId = colElement.children[0].getAttribute("data-id");
                if (clickdItemId){
                    this.controller.filterByItemId(clickdItemId);
                }                
            });
        }
    }

    _createHandlebars(anArtWork) {
        let result = this.template(anArtWork);
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
        this._changeItem(item, '#item-row');
        let filterBtn = document.querySelector(itemRowSelectorButton);
        // Prevent errors during first initialization
        if (filterBtn) {
            if (hideFilterButton) {
                filterBtn.classList.add("visually-hidden");
            } else {
                filterBtn.classList.remove("visually-hidden");
            }
        }
    }

    _changeColItem(item, hideFilterButton) {
        this._changeItem(item, '#item-col');
        let filterBtn = document.querySelector(itemColSelectorButton);
        // Prevent errors during first initialization
        if (filterBtn) {
            if (hideFilterButton) {
                filterBtn.classList.add("visually-hidden");
            } else {
                filterBtn.classList.remove("visually-hidden");
            }
        }
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
    }

    resetColItem() {
        this._changeColItem(mockItem, true);
    }

    resetRowItem() {
        this._changeRowItem(mockItem, true);
    }
}
export const itemLoader = new ItemLoader();