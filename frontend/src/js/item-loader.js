import Handlebars from "handlebars";
const itemTemplate = `
    <div class="item">
        <h1>{{tittle}}</h1>
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

class ItemLoader {

    constructor() {
        this.template = Handlebars.compile(itemTemplate);
    }
    _changeItem(item, selector) {
        let itemElement = this._createHandlebars(item);
        let colElement = document.querySelector(selector);
        colElement.innerHTML = itemElement;
    }

    _createHandlebars(anArtWork) {
        let result = this.template(anArtWork);
        console.log(result);
        return result;
    }
    _createItemElement(anArtWork) {
        let attribs = ["id", "tittle", "Object", "author", "year", "Materials", "Colour", "ColourRGB", "image", "Object group"];
        let bodyNode = document.createElement('tbody');
        bodyNode.classList.add("artwork");

        for (let att of attribs) {
            if (att === "ColourRGB") {
                continue;
            }
            let rowNode = document.createElement('tr');
            let nameNode = document.createElement('td');
            nameNode.classList.add("name");
            nameNode.innerHTML = att;
            let valueNode = document.createElement('td');
            valueNode.classList.add("value");

            if (att === "Colour") {
                let i = 0;
                for (let col of anArtWork[att]) {
                    let squareColourNode = document.createElement('div');
                    squareColourNode.classList.add("box");
                    valueNode.appendChild(squareColourNode);
                    let colour = `rgb(${anArtWork["ColourRGB"][i]})`;
                    squareColourNode.style['background-color'] = colour;
                    valueNode.appendChild(squareColourNode);
                    let colourText = document.createTextNode(col);
                    valueNode.appendChild(colourText);
                    i++;
                }
            }

            else if (att === "image") {
                let imageNode = document.createElement("img");
                imageNode.setAttribute("src", anArtWork[att]);
                valueNode.appendChild(imageNode);
            }
            else {
                valueNode.innerHTML = anArtWork[att];
            }

            rowNode.appendChild(nameNode);
            rowNode.appendChild(valueNode);

            bodyNode.appendChild(rowNode);
        }

        let artworkNode = document.createElement('table');
        artworkNode.classList.add("table");
        artworkNode.classList.add("table-striped");
        artworkNode.appendChild(bodyNode);
        return artworkNode;
    } 

    changeRowItem(item) {
        this._changeItem(item, '#item-row');
    }

    changeColItem(item) {
        this._changeItem(item, '#item-col');
    }
}
export const itemLoader = new ItemLoader();