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
    attributes: Object;

    /**
     * Name of the case attribute that represents the unique case id
     */
    id: string;
    
    /**
     * The cases
     */
    data: Array<Object>
}