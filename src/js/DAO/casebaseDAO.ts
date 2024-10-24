import { CasebaseDescription, StringStringObject } from "../types/simvizTypes";
import { Taxonomy } from "../types/taxonomy";
/**
 * Data Access Object that stores a casebase. It contains not only the cases
 * but also the metadata about the case description and the attribute employed
 * as unique case identifier.
 */
export class CasebaseDAO {

    /**
     * The metadata and cases of a casebase
     */
    private cbDescription: CasebaseDescription;

    /**
     * A list with all the unique identifiers of the case base
     */
    private ids: Array<string>;

    /**
     * Constructor
     * @param jsonContent Metadata and content of a casebase (see CasebaseDescription)
     */
    constructor(jsonContent: CasebaseDescription) {
        this.cbDescription = jsonContent
        // this.data = jsonContent.data;
        // this.description = jsonContent.description;
        // this.attributes = jsonContent.attributes;
        // this.attributeId = jsonContent.id;
        this.ids = this.generateIds(this.cbDescription.data);
    }

    /**
     * Return all the unique case ids for this casebase
     * @returns A list with all the case ids for this casebase
     */
    getIds(): Array<string> {
        return this.ids;
    }

    /**
     * Return the number of cases in the casebase
     * @returns The number of cases in the casebase
     */
    getNumCases(): number {
        return this.ids.length;
    }

    /**
     * Return th enam of the attribute that represents the case id
     * @returns The name of the id attribute
     */
    getAttId():string {
        return this.cbDescription.id;
    }

    /**
     * Return the attributes that define a case, with their corresponding types
     * @returns An object with the attributes that define a case
     */
    getAttributes():StringStringObject {
        return this.cbDescription.attributes;
    }

    /**
     * Return a textual description of the casebase
     */
    getDescription():string {
        return this.cbDescription.description;
    }

    /**
     * Return a case according to its id
     * @param id The unique id of the case
     * @returns The case with this id, or null if the id dose not exist in the casebase
     */
    getCaseById(id:string): Object | null {
        let index = this.ids.indexOf(id);
        return index === -1 ? null : this.cbDescription.data[index];
    }

    getTaxonomy():Taxonomy | null {
        return this.cbDescription.taxonomy ? new Taxonomy(this.cbDescription.taxonomy) : null;
    }

    /**
     * Extract the unique list of ids from a list of cases
     * @param data List of cases
     * @returns A list with unique ids
     */
    private generateIds(data: Array<Object>): Array<string> {
        let idList = [];
        let i = 0;
        for (const item of data) {
            idList[i] = item[<keyof Object>this.cbDescription.id].toString();
            i++;
        }
        return idList;
    }
}

