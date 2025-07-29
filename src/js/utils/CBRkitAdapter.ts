import {
  LocalSimilarityDescription,
  SimilarityConfiguration,
  EntrySimilarityValue,
} from "../types/simvizTypes";

/**
 * SimViz datatypes were created before CBRkit integration so we need to create
 * an adapter that transforms CBRkit serialization format into SimViz format
 */
export class CBRkitAdapter {
  /**
   * Loaded Similarity Configuration
   */
  public similarityConfiguration: SimilarityConfiguration;

  /**
   * Loaded similarity scores
   */
  public similarityScores: {
    [key: string]: EntrySimilarityValue;
  };

  /**
   * Reads the data to extract a similarity configuration and the similarity scores. The data
   * can be in SimViz od CBRkit format
   * @param data A json object in SimViz format or in CBRKit format
   */
  constructor(data: any) {
    if (
      data.hasOwnProperty("similarityConfiguration") &&
      data.hasOwnProperty("similarityScores")
    ) {
      // SimViz data format
      this.similarityScores = data.similarityScores;
      this.similarityConfiguration = CBRkitAdapter.adaptConfiguration(
        data.similarityConfiguration
      );
    } else {
      // CBRkit data format
      this.similarityConfiguration =
        CBRkitAdapter.adaptSimilarityConfiguration(data);
      this.similarityScores = CBRkitAdapter.adaptSimilarityData(data);
    }
  }

  /**
   * Reads the data containing a similarity copnfiguration and creates an instance of
   * a SimilarityConfiguration object
   * @param config data containing a similarity configuration (in SimViz or CBRkit format)
   * @returns a SimilarityConfiguration instance
   */
  static adaptConfiguration(config: any): SimilarityConfiguration {
    let adaptedConfig: any = {
      globalSim: {
        name: "",
      },
      localSim: {},
    };

    if (
      "metadata" in config &&
      "similarity_func" in config.metadata &&
      "metadata" in config.metadata.similarity_func
    ) {
      let metadata = config.metadata.similarity_func.metadata;
      adaptedConfig = this.extractSimilarityConfig(metadata);
      return adaptedConfig;
    } else {
      return config;
    }
  }

  /**
   * Extracts and transforms similarity configuration metadata into SimViz format.
   *
   * This method processes raw metadata containing similarity configuration information
   * and converts it into a {@linkcode SimilarityConfiguration} object
   *
   * @param theMetadata The raw metadata object containing similarity configuration data.
   * @returns A {@linkcode SimilarityConfiguration} object
   */
  static extractSimilarityConfig(theMetadata: any): SimilarityConfiguration {
    let adaptedConfig: any = {
      globalSim: {
        name: "",
      },
      localSim: {},
    };
    let weights: any = {};
    if ("aggregator" in theMetadata && "metadata" in theMetadata.aggregator) {
      let globalSimMetadata = theMetadata.aggregator.metadata;

      if ("pooling" in globalSimMetadata) {
        adaptedConfig.globalSim["name"] = globalSimMetadata.pooling;
      }
      if ("pooling_weights" in globalSimMetadata) {
        weights = globalSimMetadata.pooling_weights;
      }
    }

    if ("attributes" in theMetadata) {
      for (const attName of Object.keys(theMetadata.attributes)) {
        let currentLocalSim = theMetadata.attributes[attName];

        let localSimConfig: LocalSimilarityDescription = {
          name: "",
          weight: 1.0,
          description: "",
          nestedSimilarityConfiguration: null,
        };

        localSimConfig.name = currentLocalSim.name;
        localSimConfig.description = currentLocalSim["doc"];
        if (weights && attName in weights) {
          localSimConfig.weight = weights[attName];
        }

        if (
          "metadata" in currentLocalSim &&
          "aggregator" in currentLocalSim.metadata
        ) {
          let nestedSimConfig = this.extractSimilarityConfig(
            currentLocalSim.metadata
          );
          localSimConfig.nestedSimilarityConfiguration = nestedSimConfig;
          localSimConfig.name =
            currentLocalSim.metadata.aggregator.metadata.pooling;
          localSimConfig.description = currentLocalSim.metadata.aggregator.doc;
        }
        adaptedConfig.localSim[attName] = localSimConfig;
      }
    }
    return adaptedConfig;
  }

  /**
   * Adapts similarity data from CBRkit format to a standardized format.
   *
   * @param simData The similarity data to adapt is CBRkit format
   * @returns An EntrySimilarityValue objects
   */
  static adaptSimilarityData(simData: any): {
    [key: string]: EntrySimilarityValue;
  } {
    if ("steps" in simData && simData.steps.length > 0) {
      let queries = simData.steps[0].queries;
      let newData: any = {};
      for (const query of Object.keys(queries)) {
        newData[query] = queries[query].similarities;
      }
      return newData;
    }
    return simData;
  }

  /**
   * Adapts similarity configuration data by extracting metadata from CBRkit data.
   *
   * @param simData The similarity data objectin CBRkit format.
   * @returns The adapted similarity configuration in SimViz format.
   */
  static adaptSimilarityConfiguration(simData: any): SimilarityConfiguration {
    if ("steps" in simData && simData.steps.length > 0) {
      let firstStep = simData.steps[0];
      if ("metadata" in firstStep) {
        return CBRkitAdapter.adaptConfiguration(firstStep.metadata);
      }
    }
    return simData;
  }
}
