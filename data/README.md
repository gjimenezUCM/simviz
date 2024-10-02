<!-- GETTING STARTED -->
# Data

This folder contains the data employed by SimViz for the visualizations. To visualize a similarity function you need:

- A dataset in SimViz format.
- A similarity data file containing the similarity values (and partial similarities) for each pair of items in the dataset. Similarity functions must be symmetric so you can remove redundant similarity values to reduce its size. 

## Files and folders

Here we have several datasets (one folder per dataset) and similarity data over each dataset to use SimViz.

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

Each dataset folder contains a notebook called `createData` with examples for creating similarity data files. These notebooks use some common functions implemented in [utils/utils.py](./utils/utils.py).

## Visualizing new similarity data

If you create new similarity data using the notebooks, you can visualize it modifying the file `datasets.json`. You must add a new entry in the corresponding `similarityDatasets` list, including a name and the URI to similarity datafile created.