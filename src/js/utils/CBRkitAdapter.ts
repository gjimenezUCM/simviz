import {
  LocalSimilarityDescription,
  SimilarityConfiguration,
  EntrySimilarityValue,
} from "../types/simvizTypes";

export class CBRkitAdapter {
  public similarityConfiguration: SimilarityConfiguration;
  public similarityScores: {
    [key: string]: EntrySimilarityValue;
  };

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

  static adaptConfiguration(config: any): SimilarityConfiguration {
    let adaptedConfig: any = {
      globalSim: {
        name: "",
      },
      localSim: {},
    };

    if (
      "metadata" in config &&
      "similarity_func" in config["metadata"] &&
      "metadata" in config["metadata"]["similarity_func"]
    ) {
      let metadata = config["metadata"]["similarity_func"]["metadata"];
      adaptedConfig = this.extractSimilarityConfig(metadata);
      // let weights: any = {};
      // if ("aggregator" in metadata && "metadata" in metadata["aggregator"]) {
      //   let globalSimMetadata = metadata["aggregator"]["metadata"];

      //   if ("pooling" in globalSimMetadata) {
      //     adaptedConfig.globalSim.name = globalSimMetadata["pooling"];
      //   }
      //   if ("pooling_weights" in globalSimMetadata) {
      //     weights = globalSimMetadata["pooling_weights"];
      //   }
      // }

      // if ("attributes" in metadata) {
      //   for (const attName of Object.keys(metadata["attributes"])) {
      //     let currentLocalSim = metadata["attributes"][attName];

      //     let localSimConfig: LocalSimilarityDescription = {
      //       name: "",
      //       weight: 1.0,
      //       description: "",
      //     };

      //     localSimConfig["name"] = currentLocalSim["name"];
      //     localSimConfig["description"] = currentLocalSim["doc"];
      //     if (weights && attName in weights) {
      //       localSimConfig["weight"] = weights[attName];
      //     }
      //     adaptedConfig.localSim[attName] = localSimConfig;
      //   }
      // }
      return adaptedConfig;
    } else {
      return config;
    }
  }

  static extractSimilarityConfig(theMetadata: any): any {
    let adaptedConfig: any = {
      globalSim: {
        name: "",
      },
      localSim: {},
    };
    let weights: any = {};
    if (
      "aggregator" in theMetadata &&
      "metadata" in theMetadata["aggregator"]
    ) {
      let globalSimMetadata = theMetadata["aggregator"]["metadata"];

      if ("pooling" in globalSimMetadata) {
        adaptedConfig.globalSim.name = globalSimMetadata["pooling"];
      }
      if ("pooling_weights" in globalSimMetadata) {
        weights = globalSimMetadata["pooling_weights"];
      }
    }

    if ("attributes" in theMetadata) {
      for (const attName of Object.keys(theMetadata["attributes"])) {
        let currentLocalSim = theMetadata["attributes"][attName];

        let localSimConfig: LocalSimilarityDescription = {
          name: "",
          weight: 1.0,
          description: "",
          nestedSimilarityConfiguration: null,
        };

        localSimConfig["name"] = currentLocalSim["name"];
        localSimConfig["description"] = currentLocalSim["doc"];
        if (weights && attName in weights) {
          localSimConfig["weight"] = weights[attName];
        }

        if (
          "metadata" in currentLocalSim &&
          "aggregator" in currentLocalSim["metadata"]
        ) {
          let nestedSimConfig = this.extractSimilarityConfig(
            currentLocalSim["metadata"]
          );
          localSimConfig.nestedSimilarityConfiguration = nestedSimConfig;
          localSimConfig.name =
            currentLocalSim["metadata"]["aggregator"]["metadata"]["pooling"];
          localSimConfig.description =
            currentLocalSim["metadata"]["aggregator"]["doc"];

          //adaptedConfig.localSim[attName] = nestedSimConfig;
        }
        adaptedConfig.localSim[attName] = localSimConfig;
      }
    }
    return adaptedConfig;
  }

  static adaptSimilarityData(simData: any): {
    [key: string]: EntrySimilarityValue;
  } {
    if ("steps" in simData && simData["steps"].length > 0) {
      let queries = simData["steps"][0]["queries"];
      let newData: any = {};
      for (const query of Object.keys(queries)) {
        newData[query] = queries[query]["similarities"];
      }
      return newData;
    }
    return simData;
  }

  static adaptSimilarityConfiguration(simData: any): SimilarityConfiguration {
    if ("steps" in simData && simData["steps"].length > 0) {
      let firstStep = simData["steps"][0];
      if ("metadata" in firstStep) {
        return CBRkitAdapter.adaptConfiguration(firstStep["metadata"]);
      }
    }
    return simData;
  }
}
