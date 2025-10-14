<!-- GETTING STARTED -->
# SimViz Data

The [`data`](/data/)  folder contains the data employed by SimViz for the visualizations. To visualize a similarity function you need:

- A dataset in SimViz format.
- A similarity data file in SimViz format, containing the similarity values (and partial similarities) for each pair of items in the dataset.

Next subsections describe the content of this folder and how to create the data to visualize your own dataset.

## Files and folders

Here we have several case bases (one folder per dataset) and similarity data over each dataset to use SimViz.

Additionally, this folder contains the following files:

- `datasets.json`: It mainly contains URIs to the datasets and similarity functions visualized in SimViz. 
- [dataset_template.json](/dataset_template.json) and [similarityData_template.json](/similarityData_template.json): Contains templates of the format expected by SimViz for datasets and similarity data, respectively. 


## Generating similarity data files

Here we describe how to generate similarity data files. You can generate the data by your own using the templates described in the previous section. However, it is easier to generate the similarity data using [CBRkit](https://github.com/wi2trier/cbrkit), a Python framework for building Case-based Reasoning applications. 

### Prerequisites

Create a virtual environment (`.venv`) and install CBRkit prerrequisites (in `requirements.txt`) with:

  ```sh
  sh configure.sh
  ```

### Generating Similarity data using predefined scripts.

Every dataset folder contains a `createDataUsingCBRkit.py` script to regenerate the similarity data for each dataset. These scripts can be used as examples to use CBRkit to generate new similarity data files. To run these scripts:

  ```sh
  source .venv/bin/activate # or .venv\Scripts\activate (in Windows)
  python DMH/createDataUsingCBRkit.py
  ```

## Visualizing new similarity data

If you generated new similarity data using these scripts, you can visualize it modifying the file `datasets.json`:
1. If it is created for an existing case base, add a new entry in the corresponding `similarityDatasets` list, including a name and the URI to similarity datafile created.
2. If you are using a new case base, add a new dataset object in `data/datasets.json` file:

```json
{
    "dataset": {
      "name": "<YOUR NEW CASE BASE NAME>",
      "uri": "<URI TO THE DATASET FILE>"
    },
    "similarityDatasets": [
      {
        "name": "<YOUR NEW SIMILARITY DATA>",
        "uri": "<URI TO THE SIMILARITY DATA FILE>"
      }
    ]
  }
```