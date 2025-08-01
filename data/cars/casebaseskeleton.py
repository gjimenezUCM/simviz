# Metadata for the cars dataset that includes a textual description, case metadata and a taxonomy on Manufacturer attribute
casebaseCarSkeleton = {
   "metadata": {
       "description": "Sample of [Used cars dataset](https://www.kaggle.com/datasets/austinreese/craigslist-carstrucks-data). Some attributes from the original were removed", 
        "attributes": {"id": "string", "year": "number", "manufacturer": "Taxonomy", "model": "string", "condition": "string", "fuel": "string", "title_status": "string", "transmission": "string", "type": "string", "drive": "string", "paint_color": "Color","price": "number"}, 
        "id": "id", 
        "taxonomy":{
        "on_attribute":"manufacturer",
        "nodes":[
            {
                "id": 0,
                "label": "Manufacturers",
                "parent": -1,
                "weight": 0.0,
                "depth": 0
            },
            {
                "id": 1,
                "label": "AwtoWAS",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 2,
                "label": "lada",
                "parent": 1,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 3,
                "label": "BMW AG",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 4,
                "label": "bmw",
                "parent": 3,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 5,
                "label": "mini",
                "parent": 3,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 6,
                "label": "Rolls-Royce Motor Cars",
                "parent": 3,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 7,
                "label": "rolls-royce",
                "parent": 6,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 8,
                "label": "Fiat Chrysler Automobiles",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 9,
                "label": "alfa-romeo",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 10,
                "label": "Chrysler Group",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 11,
                "label": "chrysler",
                "parent": 10,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 12,
                "label": "ram",
                "parent": 10,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 13,
                "label": "dodge",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 14,
                "label": "FCA Italy S.p.A.",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 15,
                "label": "fiat",
                "parent": 14,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 16,
                "label": "lancia",
                "parent": 14,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 17,
                "label": "ferrari",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 18,
                "label": "jeep",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 19,
                "label": "Daimler AG",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 20,
                "label": "mercedes-benz",
                "parent": 19,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 21,
                "label": "smart",
                "parent": 19,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 22,
                "label": "Daewoo Motor Company",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 23,
                "label": "daewoo",
                "parent": 22,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 24,
                "label": "Ford Motor Company",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 25,
                "label": "aston-martin",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 26,
                "label": "ford",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 27,
                "label": "jaguar",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 28,
                "label": "land-rover",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 29,
                "label": "lincoln",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 30,
                "label": "mazda",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 31,
                "label": "mercury",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 32,
                "label": "rover",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 33,
                "label": "volvo",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 34,
                "label": "General Motors",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 35,
                "label": "buick",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 36,
                "label": "cadillac",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 37,
                "label": "chevrolet",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 38,
                "label": "gmc",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 39,
                "label": "hummer",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 40,
                "label": "pontiac",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 41,
                "label": "saturn",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 42,
                "label": "Saab Automobile",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 43,
                "label": "saab",
                "parent": 42,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 44,
                "label": "Harley Davidson Inc",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 45,
                "label": "harley-davidson",
                "parent": 44,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 46,
                "label": "Honda Group",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 47,
                "label": "acura",
                "parent": 46,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 48,
                "label": "honda",
                "parent": 46,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 49,
                "label": "Hyundai Motor Company",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 50,
                "label": "hyundai",
                "parent": 49,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 51,
                "label": "Isuzu Motors Limited",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 52,
                "label": "isuzu",
                "parent": 51,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 53,
                "label": "statesman",
                "parent": 51,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 54,
                "label": "suzuki",
                "parent": 51,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 55,
                "label": "Kia Motors",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 56,
                "label": "asia",
                "parent": 55,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 57,
                "label": "kia",
                "parent": 55,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 58,
                "label": "Lotus Cars",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 59,
                "label": "lotus",
                "parent": 58,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 60,
                "label": "Maserati S.p.A.",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 61,
                "label": "maserati",
                "parent": 60,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 62,
                "label": "Peugeot Societe Anonyme",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 63,
                "label": "citroen",
                "parent": 62,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 64,
                "label": "peugeot",
                "parent": 62,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 65,
                "label": "opel",
                "parent": 62,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 66,
                "label": "Renault-Nissan-Mitsubishi",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 67,
                "label": "Nissan Motor Company",
                "parent": 66,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 68,
                "label": "datsun",
                "parent": 67,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 69,
                "label": "nissan",
                "parent": 67,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 70,
                "label": "infiniti",
                "parent": 67,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 71,
                "label": "Renault Group",
                "parent": 66,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 72,
                "label": "dacia",
                "parent": 71,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 73,
                "label": "renault",
                "parent": 71,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 74,
                "label": "Mitsubishi Motors",
                "parent": 66,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 75,
                "label": "mitsubishi",
                "parent": 74,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 76,
                "label": "Skoda Auto",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 77,
                "label": "skoda",
                "parent": 76,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 78,
                "label": "Subaru Corporation",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 79,
                "label": "subaru",
                "parent": 78,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 80,
                "label": "Tesla Inc.",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 81,
                "label": "tesla",
                "parent": 80,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 82,
                "label": "Toyota Motor Corporation",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 83,
                "label": "lexus",
                "parent": 82,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 84,
                "label": "daihatsu",
                "parent": 82,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 85,
                "label": "toyota",
                "parent": 82,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 86,
                "label": "VEB Automobilwerk",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 87,
                "label": "trabant",
                "parent": 86,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 88,
                "label": "Volkswagen AG",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 89,
                "label": "audi",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 90,
                "label": "bentley",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 91,
                "label": "lamborghini",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 92,
                "label": "porsche",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 93,
                "label": "seat",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 94,
                "label": "volkswagen",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            }
        ],
        "edges":[
            {
                "id": 0,
                "from": 0,
                "to": 1
            },
            {
                "id": 1,
                "from": 1,
                "to": 2
            },
            {
                "id": 2,
                "from": 0,
                "to": 3
            },
            {
                "id": 3,
                "from": 3,
                "to": 4
            },
            {
                "id": 4,
                "from": 3,
                "to": 5
            },
            {
                "id": 5,
                "from": 3,
                "to": 6
            },
            {
                "id": 6,
                "from": 6,
                "to": 7
            },
            {
                "id": 7,
                "from": 0,
                "to": 8
            },
            {
                "id": 8,
                "from": 8,
                "to": 9
            },
            {
                "id": 9,
                "from": 8,
                "to": 10
            },
            {
                "id": 10,
                "from": 10,
                "to": 11
            },
            {
                "id": 11,
                "from": 10,
                "to": 12
            },
            {
                "id": 12,
                "from": 8,
                "to": 13
            },
            {
                "id": 13,
                "from": 8,
                "to": 14
            },
            {
                "id": 14,
                "from": 14,
                "to": 15
            },
            {
                "id": 15,
                "from": 14,
                "to": 16
            },
            {
                "id": 16,
                "from": 8,
                "to": 17
            },
            {
                "id": 17,
                "from": 8,
                "to": 18
            },
            {
                "id": 18,
                "from": 0,
                "to": 19
            },
            {
                "id": 19,
                "from": 19,
                "to": 20
            },
            {
                "id": 20,
                "from": 19,
                "to": 21
            },
            {
                "id": 21,
                "from": 0,
                "to": 22
            },
            {
                "id": 22,
                "from": 22,
                "to": 23
            },
            {
                "id": 23,
                "from": 0,
                "to": 24
            },
            {
                "id": 24,
                "from": 24,
                "to": 25
            },
            {
                "id": 25,
                "from": 24,
                "to": 26
            },
            {
                "id": 26,
                "from": 24,
                "to": 27
            },
            {
                "id": 27,
                "from": 24,
                "to": 28
            },
            {
                "id": 28,
                "from": 24,
                "to": 29
            },
            {
                "id": 29,
                "from": 24,
                "to": 30
            },
            {
                "id": 30,
                "from": 24,
                "to": 31
            },
            {
                "id": 31,
                "from": 24,
                "to": 32
            },
            {
                "id": 32,
                "from": 24,
                "to": 33
            },
            {
                "id": 33,
                "from": 0,
                "to": 34
            },
            {
                "id": 34,
                "from": 34,
                "to": 35
            },
            {
                "id": 35,
                "from": 34,
                "to": 36
            },
            {
                "id": 36,
                "from": 34,
                "to": 37
            },
            {
                "id": 37,
                "from": 34,
                "to": 38
            },
            {
                "id": 38,
                "from": 34,
                "to": 39
            },
            {
                "id": 39,
                "from": 34,
                "to": 40
            },
            {
                "id": 40,
                "from": 34,
                "to": 41
            },
            {
                "id": 41,
                "from": 34,
                "to": 42
            },
            {
                "id": 42,
                "from": 42,
                "to": 43
            },
            {
                "id": 43,
                "from": 0,
                "to": 44
            },
            {
                "id": 44,
                "from": 44,
                "to": 45
            },
            {
                "id": 45,
                "from": 0,
                "to": 46
            },
            {
                "id": 46,
                "from": 46,
                "to": 47
            },
            {
                "id": 47,
                "from": 46,
                "to": 48
            },
            {
                "id": 48,
                "from": 0,
                "to": 49
            },
            {
                "id": 49,
                "from": 49,
                "to": 50
            },
            {
                "id": 50,
                "from": 0,
                "to": 51
            },
            {
                "id": 51,
                "from": 51,
                "to": 52
            },
            {
                "id": 52,
                "from": 51,
                "to": 53
            },
            {
                "id": 53,
                "from": 51,
                "to": 54
            },
            {
                "id": 54,
                "from": 0,
                "to": 55
            },
            {
                "id": 55,
                "from": 55,
                "to": 56
            },
            {
                "id": 56,
                "from": 55,
                "to": 57
            },
            {
                "id": 57,
                "from": 0,
                "to": 58
            },
            {
                "id": 58,
                "from": 58,
                "to": 59
            },
            {
                "id": 59,
                "from": 0,
                "to": 60
            },
            {
                "id": 60,
                "from": 60,
                "to": 61
            },
            {
                "id": 61,
                "from": 0,
                "to": 62
            },
            {
                "id": 62,
                "from": 62,
                "to": 63
            },
            {
                "id": 63,
                "from": 62,
                "to": 64
            },
            {
                "id": 64,
                "from": 62,
                "to": 65
            },
            {
                "id": 65,
                "from": 0,
                "to": 66
            },
            {
                "id": 66,
                "from": 66,
                "to": 67
            },
            {
                "id": 67,
                "from": 67,
                "to": 68
            },
            {
                "id": 68,
                "from": 67,
                "to": 69
            },
            {
                "id": 69,
                "from": 67,
                "to": 70
            },
            {
                "id": 70,
                "from": 66,
                "to": 71
            },
            {
                "id": 71,
                "from": 71,
                "to": 72
            },
            {
                "id": 72,
                "from": 71,
                "to": 73
            },
            {
                "id": 73,
                "from": 66,
                "to": 74
            },
            {
                "id": 74,
                "from": 74,
                "to": 75
            },
            {
                "id": 75,
                "from": 0,
                "to": 76
            },
            {
                "id": 76,
                "from": 76,
                "to": 77
            },
            {
                "id": 77,
                "from": 0,
                "to": 78
            },
            {
                "id": 78,
                "from": 78,
                "to": 79
            },
            {
                "id": 79,
                "from": 0,
                "to": 80
            },
            {
                "id": 80,
                "from": 80,
                "to": 81
            },
            {
                "id": 81,
                "from": 0,
                "to": 82
            },
            {
                "id": 82,
                "from": 82,
                "to": 83
            },
            {
                "id": 83,
                "from": 82,
                "to": 84
            },
            {
                "id": 84,
                "from": 82,
                "to": 85
            },
            {
                "id": 85,
                "from": 0,
                "to": 86
            },
            {
                "id": 86,
                "from": 86,
                "to": 87
            },
            {
                "id": 87,
                "from": 0,
                "to": 88
            },
            {
                "id": 88,
                "from": 88,
                "to": 89
            },
            {
                "id": 89,
                "from": 88,
                "to": 90
            },
            {
                "id": 90,
                "from": 88,
                "to": 91
            },
            {
                "id": 91,
                "from": 88,
                "to": 92
            },
            {
                "id": 92,
                "from": 88,
                "to": 93
            },
            {
                "id": 93,
                "from": 88,
                "to": 94
            }
            ]
        }
    }
}

# Metadata for the cars dataset that includes a textual description, case metadata and a taxonomy on Manufacturer attribute
casebaseCarOOSkeleton = {
   "metadata": {
       "description": "Sample of [Used cars dataset](https://www.kaggle.com/datasets/austinreese/craigslist-carstrucks-data) with object-oriented attribute (Model). Some attributes from the original were removed", 
        "attributes": {"id": "string", "year": "number", "model": {"make": "string", "manufacturer": "Taxonomy"},"condition": "string", "fuel": "string", "title_status": "string", "transmission": "string", "type": "string", "drive": "string", "paint_color": "Color","price": "number"},
        "id": "id", 
        "taxonomy":{
        "on_attribute":"manufacturer",
        "nodes":[
            {
                "id": 0,
                "label": "Manufacturers",
                "parent": -1,
                "weight": 0.0,
                "depth": 0
            },
            {
                "id": 1,
                "label": "AwtoWAS",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 2,
                "label": "lada",
                "parent": 1,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 3,
                "label": "BMW AG",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 4,
                "label": "bmw",
                "parent": 3,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 5,
                "label": "mini",
                "parent": 3,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 6,
                "label": "Rolls-Royce Motor Cars",
                "parent": 3,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 7,
                "label": "rolls-royce",
                "parent": 6,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 8,
                "label": "Fiat Chrysler Automobiles",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 9,
                "label": "alfa-romeo",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 10,
                "label": "Chrysler Group",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 11,
                "label": "chrysler",
                "parent": 10,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 12,
                "label": "ram",
                "parent": 10,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 13,
                "label": "dodge",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 14,
                "label": "FCA Italy S.p.A.",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 15,
                "label": "fiat",
                "parent": 14,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 16,
                "label": "lancia",
                "parent": 14,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 17,
                "label": "ferrari",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 18,
                "label": "jeep",
                "parent": 8,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 19,
                "label": "Daimler AG",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 20,
                "label": "mercedes-benz",
                "parent": 19,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 21,
                "label": "smart",
                "parent": 19,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 22,
                "label": "Daewoo Motor Company",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 23,
                "label": "daewoo",
                "parent": 22,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 24,
                "label": "Ford Motor Company",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 25,
                "label": "aston-martin",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 26,
                "label": "ford",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 27,
                "label": "jaguar",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 28,
                "label": "land-rover",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 29,
                "label": "lincoln",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 30,
                "label": "mazda",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 31,
                "label": "mercury",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 32,
                "label": "rover",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 33,
                "label": "volvo",
                "parent": 24,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 34,
                "label": "General Motors",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 35,
                "label": "buick",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 36,
                "label": "cadillac",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 37,
                "label": "chevrolet",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 38,
                "label": "gmc",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 39,
                "label": "hummer",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 40,
                "label": "pontiac",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 41,
                "label": "saturn",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 42,
                "label": "Saab Automobile",
                "parent": 34,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 43,
                "label": "saab",
                "parent": 42,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 44,
                "label": "Harley Davidson Inc",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 45,
                "label": "harley-davidson",
                "parent": 44,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 46,
                "label": "Honda Group",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 47,
                "label": "acura",
                "parent": 46,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 48,
                "label": "honda",
                "parent": 46,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 49,
                "label": "Hyundai Motor Company",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 50,
                "label": "hyundai",
                "parent": 49,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 51,
                "label": "Isuzu Motors Limited",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 52,
                "label": "isuzu",
                "parent": 51,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 53,
                "label": "statesman",
                "parent": 51,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 54,
                "label": "suzuki",
                "parent": 51,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 55,
                "label": "Kia Motors",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 56,
                "label": "asia",
                "parent": 55,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 57,
                "label": "kia",
                "parent": 55,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 58,
                "label": "Lotus Cars",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 59,
                "label": "lotus",
                "parent": 58,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 60,
                "label": "Maserati S.p.A.",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 61,
                "label": "maserati",
                "parent": 60,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 62,
                "label": "Peugeot Societe Anonyme",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 63,
                "label": "citroen",
                "parent": 62,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 64,
                "label": "peugeot",
                "parent": 62,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 65,
                "label": "opel",
                "parent": 62,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 66,
                "label": "Renault-Nissan-Mitsubishi",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 67,
                "label": "Nissan Motor Company",
                "parent": 66,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 68,
                "label": "datsun",
                "parent": 67,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 69,
                "label": "nissan",
                "parent": 67,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 70,
                "label": "infiniti",
                "parent": 67,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 71,
                "label": "Renault Group",
                "parent": 66,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 72,
                "label": "dacia",
                "parent": 71,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 73,
                "label": "renault",
                "parent": 71,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 74,
                "label": "Mitsubishi Motors",
                "parent": 66,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 75,
                "label": "mitsubishi",
                "parent": 74,
                "weight": 1.0,
                "depth": 3
            },
            {
                "id": 76,
                "label": "Skoda Auto",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 77,
                "label": "skoda",
                "parent": 76,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 78,
                "label": "Subaru Corporation",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 79,
                "label": "subaru",
                "parent": 78,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 80,
                "label": "Tesla Inc.",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 81,
                "label": "tesla",
                "parent": 80,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 82,
                "label": "Toyota Motor Corporation",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 83,
                "label": "lexus",
                "parent": 82,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 84,
                "label": "daihatsu",
                "parent": 82,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 85,
                "label": "toyota",
                "parent": 82,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 86,
                "label": "VEB Automobilwerk",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 87,
                "label": "trabant",
                "parent": 86,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 88,
                "label": "Volkswagen AG",
                "parent": 0,
                "weight": 1.0,
                "depth": 1
            },
            {
                "id": 89,
                "label": "audi",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 90,
                "label": "bentley",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 91,
                "label": "lamborghini",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 92,
                "label": "porsche",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 93,
                "label": "seat",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            },
            {
                "id": 94,
                "label": "volkswagen",
                "parent": 88,
                "weight": 1.0,
                "depth": 2
            }
        ],
        "edges":[
            {
                "id": 0,
                "from": 0,
                "to": 1
            },
            {
                "id": 1,
                "from": 1,
                "to": 2
            },
            {
                "id": 2,
                "from": 0,
                "to": 3
            },
            {
                "id": 3,
                "from": 3,
                "to": 4
            },
            {
                "id": 4,
                "from": 3,
                "to": 5
            },
            {
                "id": 5,
                "from": 3,
                "to": 6
            },
            {
                "id": 6,
                "from": 6,
                "to": 7
            },
            {
                "id": 7,
                "from": 0,
                "to": 8
            },
            {
                "id": 8,
                "from": 8,
                "to": 9
            },
            {
                "id": 9,
                "from": 8,
                "to": 10
            },
            {
                "id": 10,
                "from": 10,
                "to": 11
            },
            {
                "id": 11,
                "from": 10,
                "to": 12
            },
            {
                "id": 12,
                "from": 8,
                "to": 13
            },
            {
                "id": 13,
                "from": 8,
                "to": 14
            },
            {
                "id": 14,
                "from": 14,
                "to": 15
            },
            {
                "id": 15,
                "from": 14,
                "to": 16
            },
            {
                "id": 16,
                "from": 8,
                "to": 17
            },
            {
                "id": 17,
                "from": 8,
                "to": 18
            },
            {
                "id": 18,
                "from": 0,
                "to": 19
            },
            {
                "id": 19,
                "from": 19,
                "to": 20
            },
            {
                "id": 20,
                "from": 19,
                "to": 21
            },
            {
                "id": 21,
                "from": 0,
                "to": 22
            },
            {
                "id": 22,
                "from": 22,
                "to": 23
            },
            {
                "id": 23,
                "from": 0,
                "to": 24
            },
            {
                "id": 24,
                "from": 24,
                "to": 25
            },
            {
                "id": 25,
                "from": 24,
                "to": 26
            },
            {
                "id": 26,
                "from": 24,
                "to": 27
            },
            {
                "id": 27,
                "from": 24,
                "to": 28
            },
            {
                "id": 28,
                "from": 24,
                "to": 29
            },
            {
                "id": 29,
                "from": 24,
                "to": 30
            },
            {
                "id": 30,
                "from": 24,
                "to": 31
            },
            {
                "id": 31,
                "from": 24,
                "to": 32
            },
            {
                "id": 32,
                "from": 24,
                "to": 33
            },
            {
                "id": 33,
                "from": 0,
                "to": 34
            },
            {
                "id": 34,
                "from": 34,
                "to": 35
            },
            {
                "id": 35,
                "from": 34,
                "to": 36
            },
            {
                "id": 36,
                "from": 34,
                "to": 37
            },
            {
                "id": 37,
                "from": 34,
                "to": 38
            },
            {
                "id": 38,
                "from": 34,
                "to": 39
            },
            {
                "id": 39,
                "from": 34,
                "to": 40
            },
            {
                "id": 40,
                "from": 34,
                "to": 41
            },
            {
                "id": 41,
                "from": 34,
                "to": 42
            },
            {
                "id": 42,
                "from": 42,
                "to": 43
            },
            {
                "id": 43,
                "from": 0,
                "to": 44
            },
            {
                "id": 44,
                "from": 44,
                "to": 45
            },
            {
                "id": 45,
                "from": 0,
                "to": 46
            },
            {
                "id": 46,
                "from": 46,
                "to": 47
            },
            {
                "id": 47,
                "from": 46,
                "to": 48
            },
            {
                "id": 48,
                "from": 0,
                "to": 49
            },
            {
                "id": 49,
                "from": 49,
                "to": 50
            },
            {
                "id": 50,
                "from": 0,
                "to": 51
            },
            {
                "id": 51,
                "from": 51,
                "to": 52
            },
            {
                "id": 52,
                "from": 51,
                "to": 53
            },
            {
                "id": 53,
                "from": 51,
                "to": 54
            },
            {
                "id": 54,
                "from": 0,
                "to": 55
            },
            {
                "id": 55,
                "from": 55,
                "to": 56
            },
            {
                "id": 56,
                "from": 55,
                "to": 57
            },
            {
                "id": 57,
                "from": 0,
                "to": 58
            },
            {
                "id": 58,
                "from": 58,
                "to": 59
            },
            {
                "id": 59,
                "from": 0,
                "to": 60
            },
            {
                "id": 60,
                "from": 60,
                "to": 61
            },
            {
                "id": 61,
                "from": 0,
                "to": 62
            },
            {
                "id": 62,
                "from": 62,
                "to": 63
            },
            {
                "id": 63,
                "from": 62,
                "to": 64
            },
            {
                "id": 64,
                "from": 62,
                "to": 65
            },
            {
                "id": 65,
                "from": 0,
                "to": 66
            },
            {
                "id": 66,
                "from": 66,
                "to": 67
            },
            {
                "id": 67,
                "from": 67,
                "to": 68
            },
            {
                "id": 68,
                "from": 67,
                "to": 69
            },
            {
                "id": 69,
                "from": 67,
                "to": 70
            },
            {
                "id": 70,
                "from": 66,
                "to": 71
            },
            {
                "id": 71,
                "from": 71,
                "to": 72
            },
            {
                "id": 72,
                "from": 71,
                "to": 73
            },
            {
                "id": 73,
                "from": 66,
                "to": 74
            },
            {
                "id": 74,
                "from": 74,
                "to": 75
            },
            {
                "id": 75,
                "from": 0,
                "to": 76
            },
            {
                "id": 76,
                "from": 76,
                "to": 77
            },
            {
                "id": 77,
                "from": 0,
                "to": 78
            },
            {
                "id": 78,
                "from": 78,
                "to": 79
            },
            {
                "id": 79,
                "from": 0,
                "to": 80
            },
            {
                "id": 80,
                "from": 80,
                "to": 81
            },
            {
                "id": 81,
                "from": 0,
                "to": 82
            },
            {
                "id": 82,
                "from": 82,
                "to": 83
            },
            {
                "id": 83,
                "from": 82,
                "to": 84
            },
            {
                "id": 84,
                "from": 82,
                "to": 85
            },
            {
                "id": 85,
                "from": 0,
                "to": 86
            },
            {
                "id": 86,
                "from": 86,
                "to": 87
            },
            {
                "id": 87,
                "from": 0,
                "to": 88
            },
            {
                "id": 88,
                "from": 88,
                "to": 89
            },
            {
                "id": 89,
                "from": 88,
                "to": 90
            },
            {
                "id": 90,
                "from": 88,
                "to": 91
            },
            {
                "id": 91,
                "from": 88,
                "to": 92
            },
            {
                "id": 92,
                "from": 88,
                "to": 93
            },
            {
                "id": 93,
                "from": 88,
                "to": 94
            }
            ]
        }
    }
}