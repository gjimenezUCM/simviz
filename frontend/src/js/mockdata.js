class DAOItems {
    constructor(data) {
        this.data = data;
        this.ids = this.generateIds(this.data);
    }

    generateIds(data) {
        let idList = [];
        let i=0;
        for (const item of data) {
            idList[i] = item["_id"];
            i++;
        }
        return idList;
    }

    getIds() {
        return this.ids;
    }

    getItemById(id) {
        let index = this.ids.indexOf(id);
        return index===-1 ? null : this.data[index];
    }
}

const bbdd = [
    {
        "_id": "634f19096c70ef5cf152f237",
        "title": "Scandia",
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
                109,
                114,
                120
            ]
        ],
        "image": "https://i.postimg.cc/Zqn1M35m/44171.png",
        "Object group": "cutlery",
        "Color": [
            {
                "colorName": "metal",
                "rgb": [
                    109,
                    114,
                    120
                ]
            }
        ]
    },
    {
        "_id": "634f1908b7693f159a62e2f6",
        "title": "Savonia",
        "Object": "CUTLERY",
        "Special name": "*",
        "id": "44168",
        "author": "Babel, Adolf",
        "Production date": "1967",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Hackman Sorsakoski",
        "Dimension in cm": "fork: 19.5 cm (length) x 0.1 cm (thickness)  knife: 19 cm (length) x   0.1 cm (thickness)",
        "Weight in kg": "*",
        "Materials": [
            "metal"
        ],
        "Colour": [
            "metal"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1668598994,
        "_timestamp_year": 2022,
        "_timestamp_month": 11,
        "_timestamp_day": 16,
        "_timestamp_hour": 11,
        "_timestamp_minute": 43,
        "_timestamp_second": 14,
        "_updated": 1.0,
        "year": 1967.0,
        "ColourRGB": [
            [
                109,
                114,
                120
            ]
        ],
        "image": "https://i.postimg.cc/65NxpyYV/44168.png",
        "Object group": "cutlery",
        "Color": [
            {
                "colorName": "metal",
                "rgb": [
                    109,
                    114,
                    120
                ]
            }
        ]
    },
    {
        "_id": "636bf322a8e46b2e35302848",
        "title": "Ultima Thule 2332",
        "Object": "BOWL",
        "Special name": "fruit or dessert bowl",
        "id": "14219",
        "author": "Wirkkala, Tapio",
        "Production date": "1970",
        "Collection": "*",
        "Manufacturer": "A Ahlstr\u00c3\u00b6m Oy, Iitalan lasitehdas",
        "Dimension in cm": "20x20x9",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "colourless glass"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1668018978,
        "_timestamp_year": 2022,
        "_timestamp_month": 11,
        "_timestamp_day": 9,
        "_timestamp_hour": 18,
        "_timestamp_minute": 36,
        "_timestamp_second": 18,
        "_updated": null,
        "year": 1970.0,
        "ColourRGB": [],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-017298_wirkkala_ultima_thule-2000x1621.jpg",
        "Object group": "glass",
        "Color": []
    },
    {
        "_id": "634f1907d8af1b50664089d0",
        "title": "Japanese teapot",
        "Object": "JUG",
        "Special name": "teapot",
        "id": "B561",
        "author": "*",
        "Production date": "19th century",
        "Collection": "Antell",
        "Manufacturer": "*",
        "Dimension in cm": "16,8 x 14 x 15",
        "Weight in kg": "*",
        "Materials": [
            "stoneware"
        ],
        "Colour": [
            "light brown",
            "dark brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128834,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 33,
        "_timestamp_second": 54,
        "_updated": 1.0,
        "year": null,
        "ColourRGB": [
            [
                165,
                42,
                42
            ],
            [
                92,
                64,
                51
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/10/wsi-imageoptim-b561-2000x1500.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "light brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            },
            {
                "colorName": "dark brown",
                "rgb": [
                    92,
                    64,
                    51
                ]
            }
        ]
    },
    {
        "_id": "634f1903a45b33465c10ceb2",
        "title": "Windbreaker",
        "Object": "JACKET",
        "Special name": "Jacket",
        "id": "44166",
        "author": "Kellokumpu, Ritva",
        "Production date": "1984",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Torstai",
        "Dimension in cm": "*",
        "Weight in kg": "*",
        "Materials": [
            "polyesterivanu"
        ],
        "Colour": [
            "orange",
            " green",
            " blue",
            " pink"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128709,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 31,
        "_timestamp_second": 49,
        "_updated": 1.0,
        "year": 1984.0,
        "ColourRGB": [
            [
                255,
                165,
                0
            ],
            [
                0,
                128,
                0
            ],
            [
                0,
                0,
                255
            ],
            [
                255,
                192,
                203
            ]
        ],
        "image": "https://i.postimg.cc/bNHcDpB7/44166.jpg",
        "Object group": "clothes and accessories",
        "Color": [
            {
                "colorName": "orange",
                "rgb": [
                    255,
                    165,
                    0
                ]
            },
            {
                "colorName": " green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            },
            {
                "colorName": " blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " pink",
                "rgb": [
                    255,
                    192,
                    203
                ]
            }
        ]
    },
    {
        "_id": "634f1912d8af1b50664089d6",
        "title": "Rautaristi (Iron Cross)",
        "Object": "WALL TEXTILE",
        "Special name": "ryijy rug",
        "id": "16850",
        "author": "Kein\u00c3\u00a4nen-Baeckmann, Aino",
        "Production date": "1931",
        "Collection": "*",
        "Manufacturer": "Oy Neovius Ab",
        "Dimension in cm": "145 cm x 100 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool",
            "cotton"
        ],
        "Colour": [
            "violet",
            " yellowish"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128146,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 26,
        "_updated": null,
        "year": 1931.0,
        "ColourRGB": [
            [
                238,
                130,
                238
            ],
            [
                255,
                255,
                0
            ]
        ],
        "image": "https://i.postimg.cc/ZqDhbHM0/16850.jpg",
        "Object group": "wall textiles",
        "Color": [
            {
                "colorName": "violet",
                "rgb": [
                    238,
                    130,
                    238
                ]
            },
            {
                "colorName": " yellowish",
                "rgb": [
                    255,
                    255,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1912e09bfd1d9a04b8f9",
        "title": "Valkoiset hevoset (White Horses)",
        "Object": "WALL TEXTILE",
        "Special name": "ryijy rug",
        "id": "13906",
        "author": "Sotavalta, Impi",
        "Production date": "1932",
        "Collection": "*",
        "Manufacturer": "Humalaj\u00c3\u00a4rvi, Kerttu",
        "Dimension in cm": "173 cm x 126 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool",
            "cotton"
        ],
        "Colour": [
            "white",
            " red",
            " brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128146,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 26,
        "_updated": null,
        "year": 1932.0,
        "ColourRGB": [
            [
                255,
                255,
                255
            ],
            [
                255,
                0,
                0
            ],
            [
                165,
                42,
                42
            ]
        ],
        "image": "https://i.postimg.cc/mgB48t9Z/13906.jpg",
        "Object group": "wall textiles",
        "Color": [
            {
                "colorName": "white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            },
            {
                "colorName": " red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f1912d4227a56290cb6d2",
        "title": "Liekki (Flame)",
        "Object": "WALL TEXTILE, ART TEXTILE",
        "Special name": "ryijy rug",
        "id": "17876",
        "author": "Gallen-Kallela, Akseli",
        "Production date": "1899",
        "Collection": "*",
        "Manufacturer": "Suomen K\u00c3\u00a4sity\u00c3\u00b6n yst\u00c3\u00a4v\u00c3\u00a4t /  Asikainen, Ann-Mari ja Lindberg, Merja",
        "Dimension in cm": "175 cm x 250 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool",
            "cotton"
        ],
        "Colour": [],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128146,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 26,
        "_updated": null,
        "year": 1899.0,
        "ColourRGB": [],
        "image": "https://i.postimg.cc/fWdhsxjT/17876.jpg",
        "Object group": "wall textiles",
        "Color": []
    },
    {
        "_id": "634f1911d28967637e31c912",
        "title": "Nelj\u00e4 v\u00e4ri\u00e4 (Four Colours)",
        "Object": "WALL TEXTILE",
        "Special name": "ryijy rug",
        "id": "32628",
        "author": "Simberg-Ehrstr\u00c3\u00b6m, Uhra",
        "Production date": "1958",
        "Collection": "Opetusministeri\u00c3\u00b6n ryijykokoelma",
        "Manufacturer": "Suomen K\u00c3\u00a4sity\u00c3\u00b6n Yst\u00c3\u00a4v\u00c3\u00a4t /  Sillfors, Pirkko",
        "Dimension in cm": "180 cm x 119 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool"
        ],
        "Colour": [],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128145,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 25,
        "_updated": null,
        "year": 1958.0,
        "ColourRGB": [],
        "image": "https://i.postimg.cc/d3GM9YtT/32628.jpg",
        "Object group": "wall textiles",
        "Color": []
    },
    {
        "_id": "634f1911a45b33465c10ceba",
        "title": "Seebra (Zebra)",
        "Object": "WALL TEXTILE",
        "Special name": "ryijy rug",
        "id": "32627",
        "author": "Brummer, Eva",
        "Production date": "1951",
        "Collection": "Opetusministeri\u00c3\u00b6n ryijykokoelma",
        "Manufacturer": "Suomen K\u00c3\u00a4sity\u00c3\u00b6n Yst\u00c3\u00a4v\u00c3\u00a4t /  Ahlblad, Margit",
        "Dimension in cm": "178 cm x 118 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool",
            "cotton"
        ],
        "Colour": [
            "black",
            " white"
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
        "year": 1951.0,
        "ColourRGB": [
            [
                0,
                0,
                0
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://i.postimg.cc/GmL0v60H/32627.jpg",
        "Object group": "wall textiles",
        "Color": [
            {
                "colorName": "black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f19119d480d2bcc4ac7ac",
        "title": "Suopursuja (Marsh Tea)",
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
                165,
                42,
                42
            ]
        ],
        "image": "https://i.postimg.cc/rppk23gv/16851.jpg",
        "Object group": "wall textiles",
        "Color": [
            {
                "colorName": "brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f19106c70ef5cf152f23b",
        "title": "Raitakaita",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44184",
        "author": "Lepp\u00c3\u00a4nen, Helena",
        "Production date": "2001",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Hackman Designor",
        "Dimension in cm": "*",
        "Weight in kg": "*",
        "Materials": [
            "porcelain"
        ],
        "Colour": [
            "blue",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128144,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 24,
        "_updated": null,
        "year": 2001.0,
        "ColourRGB": [
            [
                0,
                0,
                255
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://i.postimg.cc/HLFPvhN0/44184.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f19105350725cb83093c4",
        "title": "Suo (Marsh)",
        "Object": "WALL TEXTILE",
        "Special name": "ryijy rug",
        "id": "32361",
        "author": "Puotila, Ritva",
        "Production date": "1975",
        "Collection": "Opetusministeri\u00c3\u00b6n ryijykokoelma",
        "Manufacturer": "Suomen K\u00c3\u00a4sity\u00c3\u00b6n Yst\u00c3\u00a4v\u00c3\u00a4t /  Hartikainen, Anneli",
        "Dimension in cm": "174 cm x 133 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool"
        ],
        "Colour": [
            "different tones of red brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128144,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 24,
        "_updated": null,
        "year": 1975.0,
        "ColourRGB": [
            [
                165,
                42,
                42
            ]
        ],
        "image": "https://i.postimg.cc/d0fzP1hy/32361.jpg",
        "Object group": "wall textiles",
        "Color": [
            {
                "colorName": "different tones of red brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f191005fdc719f0345aef",
        "title": "Simpukka (Sea Shell)",
        "Object": "RUG",
        "Special name": "rug",
        "id": "33288",
        "author": "Metsovaara, Marjatta",
        "Production date": "1962",
        "Collection": "*",
        "Manufacturer": "Oy Finnrya Ab",
        "Dimension in cm": "167,5 cm x 134 cm",
        "Weight in kg": "*",
        "Materials": [
            "wool"
        ],
        "Colour": [
            "red",
            " aniline",
            " yellow"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128144,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 24,
        "_updated": null,
        "year": 1962.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ],
            [
                255,
                255,
                0
            ],
            [
                255,
                255,
                0
            ]
        ],
        "image": "https://i.postimg.cc/zG0s7p5p/33288.jpg",
        "Object group": "wall textiles",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " aniline",
                "rgb": [
                    255,
                    255,
                    0
                ]
            },
            {
                "colorName": " yellow",
                "rgb": [
                    255,
                    255,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f190fe09bfd1d9a04b8f7",
        "title": "Flora (model S)",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44181",
        "author": "Procop\u00c3\u00a9, Ulla  Tomula, Esteri",
        "Production date": "1978",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Arabia",
        "Dimension in cm": "cup: 10 cm (diameter) x 5,5 cm (height)  saucer: 16,3 cm (diameter) x 2 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "blue",
            " green",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128143,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 23,
        "_updated": null,
        "year": 1978.0,
        "ColourRGB": [
            [
                0,
                0,
                255
            ],
            [
                0,
                128,
                0
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://i.postimg.cc/kgXZ288S/44181.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190fd4227a56290cb6d0",
        "title": "Think and drink",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44182",
        "author": "Rintaniemi, P\u00c3\u00a4ivi",
        "Production date": "1998",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Amfora",
        "Dimension in cm": "cup: 5,5 cm (diameter) x 6 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "yellow",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128143,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 23,
        "_updated": null,
        "year": 1998.0,
        "ColourRGB": [
            [
                255,
                255,
                0
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://i.postimg.cc/nhRWBzYP/44182.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "yellow",
                "rgb": [
                    255,
                    255,
                    0
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190fb7693f159a62e2fa",
        "title": "Warm",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44183",
        "author": "Alfstr\u00c3\u00b6m, Tony,  Keaney, Brian",
        "Production date": "1998",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Tonfisk",
        "Dimension in cm": "8 cm (diameter) x 9.6 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics",
            "wood"
        ],
        "Colour": [
            "white",
            " wood"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128143,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 23,
        "_updated": null,
        "year": 1998.0,
        "ColourRGB": [
            [
                255,
                255,
                255
            ],
            [
                186,
                140,
                99
            ]
        ],
        "image": "https://i.postimg.cc/jjDFXbMd/44183.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            },
            {
                "colorName": " wood",
                "rgb": [
                    186,
                    140,
                    99
                ]
            }
        ]
    },
    {
        "_id": "634f190ea45b33465c10ceb8",
        "title": "Teema (model BAU)",
        "Object": "MUG",
        "Special name": "*",
        "id": "44178",
        "author": "Franck, Kaj",
        "Production date": "1981",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Arabia",
        "Dimension in cm": "cup: 7.2/6.4cm (base diameter / top diameter) x 5.5 cm (height)  saucer: 14.3 cm (diameter) x 2.4 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128142,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 22,
        "_updated": null,
        "year": 1981.0,
        "ColourRGB": [
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://i.postimg.cc/XNdtmn4r/44178.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190e9d480d2bcc4ac7aa",
        "title": "Ruska (model S)",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44179",
        "author": "Procop\u00c3\u00a9, Ulla",
        "Production date": "1960",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Arabia",
        "Dimension in cm": "cup: 7cm (diameter) x 7,8cm (height)  saucer: 12,6cm (diameter) x 2cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128142,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 22,
        "_updated": null,
        "year": 1960.0,
        "ColourRGB": [
            [
                165,
                42,
                42
            ]
        ],
        "image": "https://i.postimg.cc/CL09V9xm/44179.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f190ed8af1b50664089d4",
        "title": "Katrilli",
        "Object": "MUG",
        "Special name": "*",
        "id": "44180",
        "author": "Tarna, Tauno",
        "Production date": "1969",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Sarvis Oy",
        "Dimension in cm": "cup: 7 cm (diameter) x   7 cm (height)  saucer: d x h:14cm x 2cm",
        "Weight in kg": "*",
        "Materials": [
            "plastic"
        ],
        "Colour": [
            "brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128142,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 22,
        "_updated": null,
        "year": 1969.0,
        "ColourRGB": [
            [
                165,
                42,
                42
            ]
        ],
        "image": "https://i.postimg.cc/jdhmqvWK/44180.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f190d5350725cb83093c2",
        "title": "Iris (model U2)",
        "Object": "MUG",
        "Special name": "*",
        "id": "44175",
        "author": "Finch, Alfred William",
        "Production date": "1898-1902",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Ab Iris Oy",
        "Dimension in cm": "10 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "brown",
            " blue",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128141,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 21,
        "_updated": null,
        "year": 1900.0,
        "ColourRGB": [
            [
                165,
                42,
                42
            ],
            [
                0,
                0,
                255
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/08/wsi-imageoptim-b548-2000x2665.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            },
            {
                "colorName": " blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190d05fdc719f0345aed",
        "title": "Myrna (malli AX)",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44176",
        "author": "Osol, Olga",
        "Production date": "1937",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Arabia",
        "Dimension in cm": "cup: 8.4/4.1 cm (diameter) x 6.2 cm (height)  saucer: 13 cm (diameter) x 1.8 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "white",
            " brown",
            " gold"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128141,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 21,
        "_updated": null,
        "year": 1937.0,
        "ColourRGB": [
            [
                255,
                255,
                255
            ],
            [
                165,
                42,
                42
            ],
            [
                255,
                215,
                0
            ]
        ],
        "image": "https://i.postimg.cc/2yQJZ72Q/44176.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            },
            {
                "colorName": " brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            },
            {
                "colorName": " gold",
                "rgb": [
                    255,
                    215,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f190dd28967637e31c910",
        "title": "Rice porcelain cup (model FK/VA)",
        "Object": "COFFEE CUP",
        "Special name": "*",
        "id": "44177",
        "author": "Holzer-Kjellberg, Friedl",
        "Production date": "1945",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Arabia",
        "Dimension in cm": "cup: 6/4.2 cm (diameter) x 7.7 cm (height)  saucer: 12.5 cm (diameter) x 2 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "ceramics"
        ],
        "Colour": [
            "white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128141,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 21,
        "_updated": null,
        "year": 1945.0,
        "ColourRGB": [
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://i.postimg.cc/J0Vv02c7/44177.png",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190cd4227a56290cb6ce",
        "title": "i-102 (Aroma 2002)",
        "Object": "DRINKING GLASS",
        "Special name": "aroma glass",
        "id": "7762",
        "author": "Sarpaneva, Timo",
        "Production date": "1956",
        "Collection": "*",
        "Manufacturer": "Iittala",
        "Dimension in cm": "5,5 cm (diameter) x 7 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "green gray"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128140,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 20,
        "_updated": null,
        "year": 1956.0,
        "ColourRGB": [
            [
                114,
                131,
                112
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-025419-2000x1333.jpg",
        "Object group": "glass",
        "Color": [
            {
                "colorName": "green gray",
                "rgb": [
                    114,
                    131,
                    112
                ]
            }
        ]
    },
    {
        "_id": "634f190cb7693f159a62e2f8",
        "title": "I-lasi 2004",
        "Object": "DRINKING GLASS",
        "Special name": "*",
        "id": "ILM7606",
        "author": "Sarpaneva, Timo",
        "Production date": "1956",
        "Collection": "*",
        "Manufacturer": "Iittala",
        "Dimension in cm": "3,5 cm (base diameter) x 5 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "blue",
            " violet"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128140,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 20,
        "_updated": null,
        "year": 1956.0,
        "ColourRGB": [
            [
                0,
                0,
                255
            ],
            [
                238,
                130,
                238
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-025419-2000x1333.jpg",
        "Object group": "glass",
        "Color": [
            {
                "colorName": "blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " violet",
                "rgb": [
                    238,
                    130,
                    238
                ]
            }
        ]
    },
    {
        "_id": "634f190c6c70ef5cf152f239",
        "title": "Ultima Thule (18 cl)",
        "Object": "DRINKING GLASS",
        "Special name": "cocktail glass",
        "id": "14218",
        "author": "Wirkkala, Tapio",
        "Production date": "1968",
        "Collection": "*",
        "Manufacturer": "A Ahlstr\u00c3\u00b6m Oy, Iittalan lasitehdas",
        "Dimension in cm": "8,6 x 8,6 x 10,4",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "colourless glass"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128140,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 20,
        "_updated": null,
        "year": 1968.0,
        "ColourRGB": [],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-017298_wirkkala_ultima_thule-2000x1621.jpg",
        "Object group": "glass",
        "Color": []
    },
    {
        "_id": "634f190b9d480d2bcc4ac7a8",
        "title": "1718",
        "Object": "GLASS",
        "Special name": "stackable drinking glass",
        "id": "10026",
        "author": "Hopea, Saara",
        "Production date": "1954",
        "Collection": "*",
        "Manufacturer": "Nuutaj\u00c3\u00a4rven lasi",
        "Dimension in cm": "7 cm (diameter) x 8,5 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "red"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128139,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 19,
        "_updated": null,
        "year": 1954.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-dmpm_20150103_2785-2000x3000.jpg",
        "Object group": "glass",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f190bd8af1b50664089d2",
        "title": "2744 cocktail glass",
        "Object": "GLASS",
        "Special name": "drinking glass",
        "id": "12595",
        "author": "Franck, Kaj",
        "Production date": "1953",
        "Collection": "*",
        "Manufacturer": "Nuutaj\u00c3\u00a4rven lasi",
        "Dimension in cm": "8 cm (diameter) x 8 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "rubin red"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128139,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 19,
        "_updated": null,
        "year": 1953.0,
        "ColourRGB": [
            [
                224,
                17,
                95
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-025608__franck_p-1-1327x1823.jpg",
        "Object group": "glass",
        "Color": [
            {
                "colorName": "rubin red",
                "rgb": [
                    224,
                    17,
                    95
                ]
            }
        ]
    },
    {
        "_id": "634f190be09bfd1d9a04b8f5",
        "title": "1610",
        "Object": "JUG",
        "Special name": "cocktail mixer",
        "id": "22769",
        "author": "Franck, Kaj",
        "Production date": "1954",
        "Collection": "*",
        "Manufacturer": "Nuutaj\u00c3\u00a4rven lasi",
        "Dimension in cm": "10 cm x 22 cm (heigtht)",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "red",
            " purple"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128139,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 19,
        "_updated": null,
        "year": 1954.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ],
            [
                128,
                0,
                128
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-franck-1610-lh-1667x2379.jpeg",
        "Object group": "jugs",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " purple",
                "rgb": [
                    128,
                    0,
                    128
                ]
            }
        ]
    },
    {
        "_id": "634f190905fdc719f0345aeb",
        "title": "MK",
        "Object": "CREAMER",
        "Special name": "cream bottle",
        "id": "AM1699",
        "author": "Franck, Kaj",
        "Production date": "1948",
        "Collection": "*",
        "Manufacturer": "Arabia",
        "Dimension in cm": "65 mm (base diameter) x 135 mm (heigtht with lid)",
        "Weight in kg": "*",
        "Materials": [
            "porcelain"
        ],
        "Colour": [
            "white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128138,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 18,
        "_updated": null,
        "year": 1948.0,
        "ColourRGB": [
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/05/kermakko-mk-am1699-320x320.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190ad28967637e31c90e",
        "title": "BAU, Muumi",
        "Object": "MUG",
        "Special name": "mug",
        "id": "44185",
        "author": "Jansson, Tove  Franck, Kaj  Slotte-Elevant, Tove (decoration)",
        "Production date": "1979-1980 (model), 1990-1991 (decoration)",
        "Collection": "*",
        "Manufacturer": "Arabia",
        "Dimension in cm": "8 cm (height)",
        "Weight in kg": "*",
        "Materials": [
            "stoneware"
        ],
        "Colour": [
            "gray",
            " black",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128138,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 18,
        "_updated": null,
        "year": 1984.0,
        "ColourRGB": [
            [
                128,
                128,
                128
            ],
            [
                0,
                0,
                0
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/09/wsi-imageoptim-muumi1-2000x2666.jpg",
        "Object group": "cups",
        "Color": [
            {
                "colorName": "gray",
                "rgb": [
                    128,
                    128,
                    128
                ]
            },
            {
                "colorName": " black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f190aa45b33465c10ceb6",
        "title": "1618",
        "Object": "JUG",
        "Special name": "jug of a stackable glass set",
        "id": "A652",
        "author": "Hopea, Saara",
        "Production date": "1950s",
        "Collection": "*",
        "Manufacturer": "Nuutaj\u00c3\u00a4rven lasi",
        "Dimension in cm": "10.5 (diameter) x 16 (height)",
        "Weight in kg": "*",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "clear"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128138,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 18,
        "_updated": null,
        "year": 1950.0,
        "ColourRGB": [],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-dmpm_20150103_2785-2000x3000.jpg",
        "Object group": "jugs",
        "Color": []
    },
    {
        "_id": "634f19095350725cb83093c0",
        "title": "Fiskars scissors",
        "Object": "SCISSORS",
        "Special name": "*",
        "id": "44174",
        "author": "B\u00c3\u00a4ckstr\u00c3\u00b6m, Olof,  Lind\u00c3\u00a9n, Olavi",
        "Production date": "1967",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Fiskars",
        "Dimension in cm": "21 cm (length)",
        "Weight in kg": "*",
        "Materials": [
            "plastic",
            "metal"
        ],
        "Colour": [
            "orange"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128137,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 17,
        "_updated": null,
        "year": 1967.0,
        "ColourRGB": [
            [
                255,
                165,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/01/wsi-imageoptim-img656-1667x2181.jpg",
        "Object group": "industrial design",
        "Color": [
            {
                "colorName": "orange",
                "rgb": [
                    255,
                    165,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1908e09bfd1d9a04b8f3",
        "title": "Pehtoori 2615",
        "Object": "POT",
        "Special name": "coffee pot",
        "id": "8182",
        "author": "Nurmesniemi, Antti",
        "Production date": "1957",
        "Collection": "*",
        "Manufacturer": "W\u00c3\u00a4rtsil\u00c3\u00a4 Oyj Abp, J\u00c3\u00a4rvenp\u00c3\u00a4\u00c3\u00a4n emali",
        "Dimension in cm": "1.5 x 1.65 (diameter of base x height without lid)",
        "Weight in kg": "*",
        "Materials": [
            "metal",
            "enamel",
            "melamine"
        ],
        "Colour": [
            "red",
            " black"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128136,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 16,
        "_updated": null,
        "year": 1957.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-025478_anurmesniemi_pehtoori_rt-1327x1990.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1908d4227a56290cb6cc",
        "title": "Cast Iron Pot",
        "Object": "CASSEROLE",
        "Special name": "cast iron casserole with a lid",
        "id": "C370",
        "author": "Sarpaneva, Timo",
        "Production date": "1960",
        "Collection": "*",
        "Manufacturer": "W. Rosenlew & Co, Porin konepaja",
        "Dimension in cm": "21.9 x 21.9 x 17.75",
        "Weight in kg": "4,918",
        "Materials": [
            "castiron",
            "teak"
        ],
        "Colour": [
            "black"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128136,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 16,
        "_updated": null,
        "year": 1960.0,
        "ColourRGB": [
            [
                0,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/10/wsi-imageoptim-32712-2000x2667.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1907a45b33465c10ceb4",
        "title": "Subway bench",
        "Object": "SEAT",
        "Special name": "bench",
        "id": "41816",
        "author": "Rajalin, B\u00c3\u00b6rje,  Nurmesniemi, Antti",
        "Production date": "1979",
        "Collection": "*",
        "Manufacturer": "Artekno Oy",
        "Dimension in cm": null,
        "Weight in kg": "*",
        "Materials": [
            "fiberglass"
        ],
        "Colour": [
            "orange"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128135,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 15,
        "_updated": null,
        "year": 1979.0,
        "ColourRGB": [
            [
                255,
                165,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/09/wsi-imageoptim-metro-41816-899x477.jpg",
        "Object group": "industrial design",
        "Color": [
            {
                "colorName": "orange",
                "rgb": [
                    255,
                    165,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f19079d480d2bcc4ac7a6",
        "title": "Garbage Bin",
        "Object": "GARBAGE BIN",
        "Special name": "*",
        "id": "44167",
        "author": "Creadesign Oy,   K\u00c3\u00a4h\u00c3\u00b6nen, Hannu",
        "Production date": "1989-1990",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "S\u00c3\u00a4kkiv\u00c3\u00a4line company",
        "Dimension in cm": "31,5x31,5x58",
        "Weight in kg": "14",
        "Materials": [
            "metal"
        ],
        "Colour": [
            "metal"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128135,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 15,
        "_updated": null,
        "year": 1989.0,
        "ColourRGB": [
            [
                109,
                114,
                120
            ]
        ],
        "image": "",
        "Object group": "industrial design",
        "Color": [
            {
                "colorName": "metal",
                "rgb": [
                    109,
                    114,
                    120
                ]
            }
        ]
    },
    {
        "_id": "634f19065350725cb83093be",
        "title": "Jopo",
        "Object": "BICYCLE",
        "Special name": "*",
        "id": "11780",
        "author": "Hellman,   Rislakki, Eero (colours)",
        "Production date": "n. 1965, 1979",
        "Collection": "*",
        "Manufacturer": "Helkama",
        "Dimension in cm": "45 cm (frame)",
        "Weight in kg": "14,9",
        "Materials": [
            "metal"
        ],
        "Colour": [
            "green",
            " black"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128134,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 14,
        "_updated": null,
        "year": 1972.0,
        "ColourRGB": [
            [
                0,
                128,
                0
            ],
            [
                0,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-img_3604-2000x1958.jpg",
        "Object group": "vehicles",
        "Color": [
            {
                "colorName": "green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            },
            {
                "colorName": " black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f190605fdc719f0345ae9",
        "title": "Solifer Export",
        "Object": "LIGHT MOTORCYCLE",
        "Special name": "moped",
        "id": "32271",
        "author": "Lindh, Richard",
        "Production date": "1960",
        "Collection": "*",
        "Manufacturer": "Wilh Bensow Oy",
        "Dimension in cm": "185 x 76 x 101",
        "Weight in kg": "45",
        "Materials": [
            "metal",
            "leather"
        ],
        "Colour": [
            "blue",
            " white",
            " red",
            " black"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128134,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 14,
        "_updated": null,
        "year": 1960.0,
        "ColourRGB": [
            [
                0,
                0,
                255
            ],
            [
                255,
                255,
                255
            ],
            [
                255,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-1210201010051517_richard_lindh_solifer_export_1960_suomi_017667-compressor-2000x1297.jpg",
        "Object group": "vehicles",
        "Color": [
            {
                "colorName": "blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            },
            {
                "colorName": " red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1906d28967637e31c90c",
        "title": "Jerry",
        "Object": "CANISTER, CONTAINER",
        "Special name": "petrol canister",
        "id": "32030",
        "author": "Rislakki, Eero",
        "Production date": "1971",
        "Collection": "*",
        "Manufacturer": "Huhtam\u00c3\u00a4ki Oyj, Pyrkij\u00c3\u00a4 Oy",
        "Dimension in cm": "24 x 17 x 35",
        "Weight in kg": "*",
        "Materials": [
            "plastic"
        ],
        "Colour": [
            "red"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128134,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 14,
        "_updated": null,
        "year": 1971.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/09/wsi-imageoptim-32030-2000x2667.jpg",
        "Object group": "industrial design",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1905d4227a56290cb6ca",
        "title": "Mobira Talkman 450",
        "Object": "TELEPHONE",
        "Special name": "portable phone",
        "id": "41379",
        "author": "Pitkonen, Jorma",
        "Production date": "1984 \u00e2\u20ac\u201c 1986",
        "Collection": "*",
        "Manufacturer": "Mobira Oy",
        "Dimension in cm": "22 x 10 x 24",
        "Weight in kg": "5,5",
        "Materials": [
            "plastic",
            "metal"
        ],
        "Colour": [
            "black"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128133,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 13,
        "_updated": null,
        "year": 1985.0,
        "ColourRGB": [
            [
                0,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/03/wsi-imageoptim-img_9261-2000x2896.jpg",
        "Object group": "devices",
        "Color": [
            {
                "colorName": "black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1905b7693f159a62e2f4",
        "title": "Asa Futura",
        "Object": "TELEVISION",
        "Special name": "*",
        "id": "20260",
        "author": "Saura, Samuli",
        "Production date": "1969",
        "Collection": "*",
        "Manufacturer": "ASA Radio Oy Turku",
        "Dimension in cm": "84 cm (height) x 57cm (width)",
        "Weight in kg": "*",
        "Materials": [
            "reinforcedplastic",
            "castaluminium"
        ],
        "Colour": [
            "red"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128133,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 13,
        "_updated": null,
        "year": 1969.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/10/wsi-imageoptim-asa-20260-320x415.jpg",
        "Object group": "devices",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f19056c70ef5cf152f235",
        "title": "C 1810 B",
        "Object": "JUICER",
        "Special name": "*",
        "id": "13154",
        "author": "Karjalainen, Heikki,  J\u00c3\u00a4ntti, Mikko",
        "Production date": "1965",
        "Collection": "*",
        "Manufacturer": "Fiskars Oyj Abp",
        "Dimension in cm": "20,5 x 23 x 28,5",
        "Weight in kg": "*",
        "Materials": [
            "plastic"
        ],
        "Colour": [
            "orange",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128133,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 13,
        "_updated": null,
        "year": 1965.0,
        "ColourRGB": [
            [
                255,
                165,
                0
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/11/wsi-imageoptim-mehulinko-320x378.jpg",
        "Object group": "industrial design",
        "Color": [
            {
                "colorName": "orange",
                "rgb": [
                    255,
                    165,
                    0
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f19049d480d2bcc4ac7a4",
        "title": "Planetaariset Laaksot (Planetary Valleys)",
        "Object": "PIECE OF JEWELRY",
        "Special name": "necklace",
        "id": "38267",
        "author": "Weckstr\u00c3\u00b6m, Bj\u00c3\u00b6rn",
        "Production date": "1969",
        "Collection": "*",
        "Manufacturer": "Lapponia Jewelry Oy",
        "Dimension in cm": "40,5 cm (length) x 25mm (width)",
        "Weight in kg": "0,1",
        "Materials": [
            "silver"
        ],
        "Colour": [
            "silver"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128132,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 12,
        "_updated": null,
        "year": 1969.0,
        "ColourRGB": [
            [
                192,
                192,
                192
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/01/wsi-imageoptim-026918_planetaarisetlaaksot_p-2000x1333.jpg",
        "Object group": "jewelry",
        "Color": [
            {
                "colorName": "silver",
                "rgb": [
                    192,
                    192,
                    192
                ]
            }
        ]
    },
    {
        "_id": "634f1904d8af1b50664089ce",
        "title": "Bo boo",
        "Object": "BAG",
        "Special name": "shoulder bag",
        "id": "41581",
        "author": "Ratia, Ristomatti (model of the bag),  Wakisaka, Katsuji (print)",
        "Production date": "1975",
        "Collection": "Marimekko",
        "Manufacturer": "Marimekko",
        "Dimension in cm": "21,8 x 11,1 x 26,3",
        "Weight in kg": "0,1",
        "Materials": [
            "cotton",
            "marquis"
        ],
        "Colour": [
            "yellow",
            " green"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128132,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 12,
        "_updated": null,
        "year": 1975.0,
        "ColourRGB": [
            [
                255,
                255,
                0
            ],
            [
                0,
                128,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/08/wsi-imageoptim-marimekko_laukku-1327x1600.jpg",
        "Object group": "clothes and accessories",
        "Color": [
            {
                "colorName": "yellow",
                "rgb": [
                    255,
                    255,
                    0
                ]
            },
            {
                "colorName": " green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1904e09bfd1d9a04b8f1",
        "title": "Nokia 9210 Communicator",
        "Object": "TELEPHONE",
        "Special name": "Communicator, smart phone",
        "id": "41377",
        "author": "Johansson, Panu",
        "Production date": "1998",
        "Collection": "*",
        "Manufacturer": "Nokia Oyj",
        "Dimension in cm": "5,6 cm (width) x 15,8cm (height) x 2,7cm (depth)",
        "Weight in kg": "0,24",
        "Materials": [
            "plastic",
            "metal"
        ],
        "Colour": [
            "gray"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128132,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 12,
        "_updated": null,
        "year": 1998.0,
        "ColourRGB": [
            [
                128,
                128,
                128
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-puhelin2-320x323.jpg",
        "Object group": "devices",
        "Color": [
            {
                "colorName": "gray",
                "rgb": [
                    128,
                    128,
                    128
                ]
            }
        ]
    },
    {
        "_id": "634f190305fdc719f0345ae7",
        "title": "Monrepos, fabric: Keidas",
        "Object": "DRESS",
        "Special name": "long dress",
        "id": "30074",
        "author": "Rimala, Annika",
        "Production date": "1967",
        "Collection": "Marimekko",
        "Manufacturer": "Marimekko",
        "Dimension in cm": "100 cm (length)",
        "Weight in kg": "*",
        "Materials": [
            "cotton"
        ],
        "Colour": [
            "green",
            " orange",
            " violet"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128131,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 11,
        "_updated": null,
        "year": 1967.0,
        "ColourRGB": [
            [
                0,
                128,
                0
            ],
            [
                255,
                165,
                0
            ],
            [
                238,
                130,
                238
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2022/09/wsi-imageoptim-2812011103641rimala_monrepos_p-1327x1958.jpg",
        "Object group": "clothes and accessories",
        "Color": [
            {
                "colorName": "green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            },
            {
                "colorName": " orange",
                "rgb": [
                    255,
                    165,
                    0
                ]
            },
            {
                "colorName": " violet",
                "rgb": [
                    238,
                    130,
                    238
                ]
            }
        ]
    },
    {
        "_id": "634f1903d28967637e31c90a",
        "title": "Model 4, fabric: Sormus",
        "Object": "DRESS",
        "Special name": "dress",
        "id": "27303",
        "author": "Nurmesniemi, Vuokko",
        "Production date": "1964 - 1970",
        "Collection": "Vuokko",
        "Manufacturer": "Vuokko Oy",
        "Dimension in cm": "99 cm (length)",
        "Weight in kg": "*",
        "Materials": [
            "wool"
        ],
        "Colour": [
            "yellow"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128131,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 11,
        "_updated": null,
        "year": 1967.0,
        "ColourRGB": [
            [
                255,
                255,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/03/wsi-imageoptim-22320118103827303-320x495.jpg",
        "Object group": "clothes and accessories",
        "Color": [
            {
                "colorName": "yellow",
                "rgb": [
                    255,
                    255,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f1902b7693f159a62e2f2",
        "title": "Lappkojs",
        "Object": "PLAYTHING",
        "Special name": "doll",
        "id": "38518",
        "author": "Franck, Kaj",
        "Production date": "1945",
        "Collection": "*",
        "Manufacturer": "Kotilieden Aitta",
        "Dimension in cm": "14 x 9",
        "Weight in kg": "0,2",
        "Materials": [
            "wood"
        ],
        "Colour": [
            "wood",
            " blue",
            " red"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128130,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 10,
        "_updated": null,
        "year": 1945.0,
        "ColourRGB": [
            [
                186,
                140,
                99
            ],
            [
                0,
                0,
                255
            ],
            [
                255,
                0,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/09/wsi-imageoptim-38518-899x1299.jpg",
        "Object group": "ornamentation",
        "Color": [
            {
                "colorName": "wood",
                "rgb": [
                    186,
                    140,
                    99
                ]
            },
            {
                "colorName": " blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f19026c70ef5cf152f231",
        "title": "Fasaani 939.015.91 (Pheasant)",
        "Object": "GLASS SCULPTURE",
        "Special name": "bird",
        "id": "13081",
        "author": "Toikka, Oiva",
        "Production date": "1980",
        "Collection": "*",
        "Manufacturer": "Nuutaj\u00c3\u00a4rven lasi",
        "Dimension in cm": "20 x 14",
        "Weight in kg": "0,9",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "silver",
            " red",
            " green"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128130,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 10,
        "_updated": null,
        "year": 1980.0,
        "ColourRGB": [
            [
                192,
                192,
                192
            ],
            [
                255,
                0,
                0
            ],
            [
                0,
                128,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/10/wsi-imageoptim-13081-2000x2667.jpg",
        "Object group": "ornamentation",
        "Color": [
            {
                "colorName": "silver",
                "rgb": [
                    192,
                    192,
                    192
                ]
            },
            {
                "colorName": " red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f19025350725cb83093bc",
        "title": "Jokapoika, fabric: Piccolo",
        "Object": "BLOUSE",
        "Special name": "shirt",
        "id": "41821",
        "author": "Nurmesniemi, Vuokko",
        "Production date": "Shirt 1956, fabric 1953",
        "Collection": "*",
        "Manufacturer": "Marimekko Oyj",
        "Dimension in cm": "80 cm (length)",
        "Weight in kg": "*",
        "Materials": [
            "cotton"
        ],
        "Colour": [
            "black",
            " white"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128130,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 10,
        "_updated": null,
        "year": 1954.0,
        "ColourRGB": [
            [
                0,
                0,
                0
            ],
            [
                255,
                255,
                255
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-es41602-2000x1806.jpg",
        "Object group": "clothes and accessories",
        "Color": [
            {
                "colorName": "black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f1901d8af1b50664089cc",
        "title": "Block",
        "Object": "LIGHT",
        "Special name": "desk lamp",
        "id": "38467",
        "author": "Koskinen, Harri",
        "Production date": "1996",
        "Collection": "*",
        "Manufacturer": "Design House Stockholm",
        "Dimension in cm": "1.0 x 1.6 x 0.9",
        "Weight in kg": "3,7",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "colourless glass"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128129,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 9,
        "_updated": null,
        "year": 1996.0,
        "ColourRGB": [],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-kk-1667x1075.jpg",
        "Object group": "devices",
        "Color": []
    },
    {
        "_id": "634f1901e09bfd1d9a04b8ef",
        "title": "Viimeinen ateria (The Last Supper)",
        "Object": "CERAMIC TILE",
        "Special name": "*",
        "id": "35971",
        "author": "Arabia / Bryk, Rut",
        "Production date": "1950",
        "Collection": "*",
        "Manufacturer": "Arabia / Bryk, Rut",
        "Dimension in cm": "70,5 x 104 x 9",
        "Weight in kg": "25",
        "Materials": [
            "faience"
        ],
        "Colour": [
            "blue tones",
            " several colours"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128129,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 9,
        "_updated": null,
        "year": 1950.0,
        "ColourRGB": [
            [
                0,
                0,
                255
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2023/04/wsi-imageoptim-bryk_-ehtoollinen1950_arabia_kuvart_8-2-1667x1213.jpg",
        "Object group": "ornamentation",
        "Color": [
            {
                "colorName": "blue tones",
                "rgb": [
                    0,
                    0,
                    255
                ]
            }
        ]
    },
    {
        "_id": "634f1901d4227a56290cb6c8",
        "title": "P\u00e4ssi (Ram)",
        "Object": "DECORATIVE OBJECT",
        "Special name": "table decoration",
        "id": "41768",
        "author": "Aarikka, Kaija",
        "Production date": "1973",
        "Collection": "*",
        "Manufacturer": "Aarikka Oy",
        "Dimension in cm": "24 (height)",
        "Weight in kg": "1,25",
        "Materials": [
            "pine"
        ],
        "Colour": [
            "wood"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128129,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 9,
        "_updated": null,
        "year": 1973.0,
        "ColourRGB": [
            [
                186,
                140,
                99
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-aarikka_passi-harry-kivilinna-1327x746.jpg",
        "Object group": "ornamentation",
        "Color": [
            {
                "colorName": "wood",
                "rgb": [
                    186,
                    140,
                    99
                ]
            }
        ]
    },
    {
        "_id": "634f1900a45b33465c10ceaf",
        "title": "W19",
        "Object": "VASE",
        "Special name": "*",
        "id": "B548",
        "author": "Finch, Alfred William",
        "Production date": "1898-1902",
        "Collection": "*",
        "Manufacturer": "Ab Iris Oy",
        "Dimension in cm": "7,5 (base diameter) x 25 (height)",
        "Weight in kg": "0,8",
        "Materials": [
            "redclay"
        ],
        "Colour": [
            "brown",
            " green",
            " blue-green"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128128,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 8,
        "_updated": null,
        "year": 1900.0,
        "ColourRGB": [
            [
                165,
                42,
                42
            ],
            [
                0,
                128,
                0
            ],
            [
                33,
                165,
                183
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/04/wsi-imageoptim-b548-2000x2665.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            },
            {
                "colorName": " green",
                "rgb": [
                    0,
                    128,
                    0
                ]
            },
            {
                "colorName": " blue-green",
                "rgb": [
                    33,
                    165,
                    183
                ]
            }
        ]
    },
    {
        "_id": "634f19009d480d2bcc4ac7a2",
        "title": "Salmenhaara vase",
        "Object": "VASE",
        "Special name": "*",
        "id": "17248",
        "author": "Salmenhaara, Kyllikki",
        "Production date": "1957",
        "Collection": "*",
        "Manufacturer": "Arabia / Salmenhaara, Kyllikki",
        "Dimension in cm": "9 (base diameter) x 26,5",
        "Weight in kg": "0,7",
        "Materials": [
            "stoneware"
        ],
        "Colour": [
            "brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128128,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 8,
        "_updated": null,
        "year": 1957.0,
        "ColourRGB": [
            [
                165,
                42,
                42
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-am6077-2000x2667.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f18ff5350725cb83093b9",
        "title": "Sauna stool",
        "Object": "SEAT",
        "Special name": "stool",
        "id": "9321",
        "author": "Nurmesniemi, Antti",
        "Production date": "1952",
        "Collection": "*",
        "Manufacturer": "Liljamaan puusep\u00c3\u00a4ntehdas",
        "Dimension in cm": "43 x 43 (istuin, s\u00c3\u00a4te, seat) x 43",
        "Weight in kg": "4",
        "Materials": [
            "birchplywood",
            "teak",
            "pinelaminate(seat)"
        ],
        "Colour": [
            "wood"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128127,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 7,
        "_updated": null,
        "year": 1952.0,
        "ColourRGB": [
            [
                186,
                140,
                99
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/01/wsi-imageoptim-luku9_025492_nurmesniemi_saunajakkara_kuvart-compressor-2000x2074.jpg",
        "Object group": "furniture",
        "Color": [
            {
                "colorName": "wood",
                "rgb": [
                    186,
                    140,
                    99
                ]
            }
        ]
    },
    {
        "_id": "634f18ff05fdc719f0345ae4",
        "title": "Savoy vase",
        "Object": "VASE",
        "Special name": "*",
        "id": "41793",
        "author": "Aalto, Alvar",
        "Production date": "1936",
        "Collection": "*",
        "Manufacturer": "Karhulan Lasi Oy",
        "Dimension in cm": "16 x 20 x 17",
        "Weight in kg": "1,55",
        "Materials": [
            "glass"
        ],
        "Colour": [
            "rio brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128127,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 7,
        "_updated": null,
        "year": 1936.0,
        "ColourRGB": [
            [
                181,
                153,
                142
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/02/wsi-imageoptim-img_9801-1327x1025.jpg",
        "Object group": "industrial design",
        "Color": [
            {
                "colorName": "rio brown",
                "rgb": [
                    181,
                    153,
                    142
                ]
            }
        ]
    },
    {
        "_id": "634f18ffd28967637e31c907",
        "title": "Finch vase",
        "Object": "VASE",
        "Special name": "*",
        "id": "16101",
        "author": "Finch, Alfred William",
        "Production date": "1898-1902",
        "Collection": "*",
        "Manufacturer": "Ab Iris Oy",
        "Dimension in cm": "12,5 (base diameter) x 19 (distance between two handles) x 21 (height)",
        "Weight in kg": "1",
        "Materials": [
            "redclay"
        ],
        "Colour": [
            "blue",
            " white",
            " brown"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128127,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 7,
        "_updated": null,
        "year": 1900.0,
        "ColourRGB": [
            [
                0,
                0,
                255
            ],
            [
                255,
                255,
                255
            ],
            [
                165,
                42,
                42
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/04/wsi-imageoptim-16101-2000x2667.jpg",
        "Object group": "pots",
        "Color": [
            {
                "colorName": "blue",
                "rgb": [
                    0,
                    0,
                    255
                ]
            },
            {
                "colorName": " white",
                "rgb": [
                    255,
                    255,
                    255
                ]
            },
            {
                "colorName": " brown",
                "rgb": [
                    165,
                    42,
                    42
                ]
            }
        ]
    },
    {
        "_id": "634f18fee09bfd1d9a04b8ec",
        "title": "Paimio / Armchair 41",
        "Object": "CHAIR",
        "Special name": "armchair",
        "id": "9249",
        "author": "Aalto, Alvar",
        "Production date": "1932",
        "Collection": "*",
        "Manufacturer": "Artek, Huonekalutehdas Korhonen",
        "Dimension in cm": "60 x 64 x 80",
        "Weight in kg": "6",
        "Materials": [
            "birch"
        ],
        "Colour": [
            "black",
            " birch"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128126,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 6,
        "_updated": null,
        "year": 1932.0,
        "ColourRGB": [
            [
                0,
                0,
                0
            ],
            [
                223,
                215,
                200
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/01/wsi-imageoptim-06391_paimio_rt-2000x1372.jpg",
        "Object group": "furniture",
        "Color": [
            {
                "colorName": "black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            },
            {
                "colorName": " birch",
                "rgb": [
                    223,
                    215,
                    200
                ]
            }
        ]
    },
    {
        "_id": "634f18fed4227a56290cb6c5",
        "title": "Pastille",
        "Object": "CHAIR",
        "Special name": "armchair",
        "id": "44165",
        "author": "Aarnio, Eero",
        "Production date": "1968",
        "Collection": "*",
        "Manufacturer": "Asko Oy",
        "Dimension in cm": "92 x 92 x 53",
        "Weight in kg": "10",
        "Materials": [
            "fiberglass"
        ],
        "Colour": [
            "yellow"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128126,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 6,
        "_updated": null,
        "year": 1968.0,
        "ColourRGB": [
            [
                255,
                255,
                0
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/10/wsi-imageoptim-pastilli-rt-p-2000x1395.jpg",
        "Object group": "furniture",
        "Color": [
            {
                "colorName": "yellow",
                "rgb": [
                    255,
                    255,
                    0
                ]
            }
        ]
    },
    {
        "_id": "634f18feb7693f159a62e2ef",
        "title": "High chair 616",
        "Object": "CHAIR",
        "Special name": "high chair",
        "id": "9226",
        "author": "Schult\u00c3\u00a9n, Ben af",
        "Production date": "1965",
        "Collection": "*",
        "Manufacturer": "Artek Oy, Huonekalutehdas Korhonen Oy ja Norrcraft",
        "Dimension in cm": "42,8 x 44 x 77",
        "Weight in kg": "6",
        "Materials": [
            "solidbirch",
            "plywood"
        ],
        "Colour": [
            "red",
            " birch"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128126,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 6,
        "_updated": null,
        "year": 1965.0,
        "ColourRGB": [
            [
                255,
                0,
                0
            ],
            [
                223,
                215,
                200
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/10/wsi-imageoptim-syottotuoli-320x410.jpg",
        "Object group": "furniture",
        "Color": [
            {
                "colorName": "red",
                "rgb": [
                    255,
                    0,
                    0
                ]
            },
            {
                "colorName": " birch",
                "rgb": [
                    223,
                    215,
                    200
                ]
            }
        ]
    },
    {
        "_id": "634f18fd9d480d2bcc4ac79f",
        "title": "Stool 60",
        "Object": "CHAIR",
        "Special name": "stool",
        "id": "44163",
        "author": "Aalto, Alvar",
        "Production date": "1933",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Artek",
        "Dimension in cm": "38 x 38 x 44",
        "Weight in kg": "2",
        "Materials": [
            "birch"
        ],
        "Colour": [
            "birch"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128125,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 5,
        "_updated": null,
        "year": 1933.0,
        "ColourRGB": [
            [
                223,
                215,
                200
            ]
        ],
        "image": "https://apicollection.designmuseum.fi/wp-content/uploads/2017/11/wsi-imageoptim-aalto_jakkara-1327x1998.jpg",
        "Object group": "furniture",
        "Color": [
            {
                "colorName": "birch",
                "rgb": [
                    223,
                    215,
                    200
                ]
            }
        ]
    },
    {
        "_id": "634f18fdd8af1b50664089c9",
        "title": "Pirkka",
        "Object": "CHAIR",
        "Special name": "Small chair",
        "id": "44164",
        "author": "Tapiovaara, Ilmari",
        "Production date": "1955",
        "Collection": "K\u00c3\u00a4ytt\u00c3\u00b6kokoelma",
        "Manufacturer": "Artek-Vitra",
        "Dimension in cm": "76 x 41 x 38",
        "Weight in kg": "2,2",
        "Materials": [
            "pine"
        ],
        "Colour": [
            "pine",
            "black"
        ],
        "_datasetid": "0daa0287-d7f4-4f03-a068-95f43afcc347",
        "_timestamp": 1666128125,
        "_timestamp_year": 2022,
        "_timestamp_month": 10,
        "_timestamp_day": 18,
        "_timestamp_hour": 22,
        "_timestamp_minute": 22,
        "_timestamp_second": 5,
        "_updated": null,
        "year": 1955.0,
        "ColourRGB": [
            [
                238,
                213,
                174
            ],
            [
                0,
                0,
                0
            ]
        ],
        "image": "https://i.postimg.cc/76F876Dk/44164.png",
        "Object group": "furniture",
        "Color": [
            {
                "colorName": "pine",
                "rgb": [
                    238,
                    213,
                    174
                ]
            },
            {
                "colorName": "black",
                "rgb": [
                    0,
                    0,
                    0
                ]
            }
        ]
    }
]

export let daoItems = new DAOItems(bbdd);