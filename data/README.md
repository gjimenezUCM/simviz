<!-- GETTING STARTED -->
# Data

This folder contains the data employed by SimViz for the visualizations. To visualize a similarity function you need:

- A dataset in SimViz format.
- A similarity data file containing the similarity values (and partial similarities) for each pair of items in the dataset. Similarity data can be using [CBRkit](https://github.com/wi2trier/cbrkit), a Python framework for building Case-based Reasoning applications.

## Files and folders

Here we have several case bases (one folder per dataset) and similarity data over each dataset to use SimViz.

Additionally, this folder contains the following files:

- `datasets.json`: It mainly contains URIs to the datasets and similarity functions visualized in SimViz. 
- `itemMetadata.json` and `similarityMetadata.json`: Contains examples of the format expected by SimViz for datasets and similarity data. 

## Generating similarity data files

Here we describe how to generate similarity data files.

### Prerequisites

Create a virtual environment and install the prerrequisites (in `requirements.txt`) with:

  ```sh
  sh configure.sh
  ```

### Similarity data notebooks

Each dataset folder contains Python scripts with examples for creating similarity data files. 

## Visualizing new similarity data

If you create new similarity data using these scripts, you can visualize it modifying the file `datasets.json`:
1. If it is created for an existing case base, add a new entry in the corresponding `similarityDatasets` list, including a name and the URI to similarity datafile created.
2. If you are using a new case base, add a new dataset object in 

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