export const anArtworkRow = {
    "_id": "634f19096c70ef5cf152f237",
    "tittle": "Scandia",
    "Object": "CUTLERY",
    "Special name": "*",
    "id": "44171",
    "author": "Franck, Kaj",
    "Production date": "1952",
    "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
    "Manufacturer": "Hackman Sorsakoski",
    "Dimension in cm": "fork: 17.5 cm (length) x 0.15cm (thickness)  knife: 18.6 cm (length) x 0.3/0.15 cm (thickness)  spoon: 18 cm (length)",
    "Weight in kg": "*",
    "Materials": [
        "metal"
    ],
    "Colour": [
        "metal"
    ],
    "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
    "_timestamp": 1668599056,
    "_timestamp_year": 2022,
    "_timestamp_month": 11,
    "_timestamp_day": 16,
    "_timestamp_hour": 11,
    "_timestamp_minute": 44,
    "_timestamp_second": 16,
    "_updated": 1.0,
    "year": 1952.0,
    "ColourRGB": [
        [
            "109",
            "114",
            "120"
        ]
    ],
    "image": "https://i.postimg.cc/Zqn1M35m/44171.png"
};


export const anArtworkCol = {
    "_id": "634f19119d480d2bcc4ac7ac",
    "tittle": "Suopursuja (Marsh Tea)",
    "Object": "WALL TEXTILE",
    "Special name": "ryijy rug",
    "id": "16851",
    "author": "Raitio, A. W.",
    "Production date": "1934",
    "Collection": "*",
    "Manufacturer": "Oy Neovius Ab",
    "Dimension in cm": "89 cm x 137 cm",
    "Weight in kg": "*",
    "Materials": [
        "wool",
        "cotton"
    ],
    "Colour": [
        "brown",
        " light pastel shade"
    ],
    "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
    "_timestamp": 1666128145,
    "_timestamp_year": 2022,
    "_timestamp_month": 10,
    "_timestamp_day": 18,
    "_timestamp_hour": 22,
    "_timestamp_minute": 22,
    "_timestamp_second": 25,
    "_updated": null,
    "year": 1934.0,
    "ColourRGB": [
        [
            "165",
            "42",
            "42"
        ]
    ],
    "image": "https://i.postimg.cc/rppk23gv/16851.jpg",
    "Object group": "wall textiles"
};

export function createItemElement(anArtWork){
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

