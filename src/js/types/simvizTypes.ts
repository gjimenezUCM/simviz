
export type StringStringObject = { [k: string]: string };

/**
 * Datatype for the metadata and the cases contained in a casebase
 */
export type CasebaseDescription = {
    /**
    * A textual description of the case base
    */
    description: string;

    /**
     * The attributes stored on a case
     */
    attributes: StringStringObject;

    /**
     * Name of the case attribute that represents the unique case id
     */
    id: string;
    
    /**
     * The cases
     */
    data: Array<Object>
}


/******************************************************************************************
 * Datatypes for similarity functions and Similarity Data
 ******************************************************************************************/

/**
 * Type for describing local similarity functions
 */
export type LocalSimilarityDescription = {
    /**
     * Name of the similarity function
     */
    simFunction: string;
    /**
     * Weight of this local similarity on a weighted global similarity function
     */
    weight: number,
    /**
     * A textual description of the local similarity function
     */
    description: string
};


/**
 * Datatype for describing a global similarity function
 */
export type SimilarityDescription =  {
    /**
     * The name of the global similarity function
     */
    globalSim: {
        simFunction: string
    },
    /**
     * Each attribute represents a local similarity function 
     */
    localSim: {
        [key:string]: LocalSimilarityDescription
    }
}

export type EntrySimilarityValue = {
    [key: string]: SimilarityValue 
}

/**
 * Datatype for describing the similarity value between a pair of cases.
 * Instead of a single value, this datatype stores the partial local similarity values
 * employed to compute the global one
 */
export type SimilarityValue = {
    /**
     * The similarity value, represented as the global similarity 
     * and the partial local similarity values
     */
    value: number,
    by_attribute: {
        [key: string]: number
    }
}




/**
 * A generic type for storing data providers:
 * - a name that describes the data provider
 * - a URI that contains the data
 */
export type DataProvider = {
    "name": string,
    "uri": string
}

/**
 * A container for the information about the datasets
 * and their corresponding similarity functions
 */
export interface DatasetInfo { 
    "dataset": DataProvider
    "similarityDatasets": Array<DataProvider>
}

