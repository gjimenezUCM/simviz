
import { SimilarityConfiguration, SimilarityValue, StringStringObject } from "../types/simvizTypes";
import { VanillaRenderer } from "./vanillaRenderer";
import {TabulatorRenderer} from "./tabulatorRenderer";


/**
 * Max size in pixels of the bar that visually represents a weight
 */
const MAX_WEIGHTBAR_SIZE_PX = 60;

/**
 * The class that represents the case comparator pane.
 * It delegates the way that the case comparator is rendered to a vanilla renderer.
 */
export class CaseComparator {

/**
 * The renderer in charge of rendering the case comparator
 */
  private renderer: TabulatorRenderer;

  /**
   * Constructor
   * @param allAtts An object with all the attributes of the cases that will be presented in the table
   * @param simDescription The similarity function that will be presented. It can be null.
   * @param attId The attribute employed as unique id.
   */
  constructor(
    allAtts: StringStringObject,
    simDescription: SimilarityConfiguration | null,
    attId: string
  ) {
    this.renderer = new TabulatorRenderer(allAtts, simDescription, attId);
  }

  /**
   * Update the case that represents a row on the heatmap
   * @param id Case unique id
   * @param item Case content
   */
  updateRowCase(id: string, item: Object | null) {
    // It goes on the left column on the table
    this.updateLeftColCase(id, item);
  }

  /**
   * Update the case that represents a column on the heatmap
   * @param id Case unique id
   * @param item Case content
   */
  updateColCase(id: string, item: Object | null) {
    // It goes on the right column on the table
    this.updateRightColCase(id, item);
  }

  /**
   * Reset the table and write empty cases
   */
  resetTable() {
    this.updateLeftColCase("id", null);
    this.updateRightColCase("id", null);
    this.updateSimilarityValue(null, null);
  }

  /**
   * Reset and display an empty case for the one that represents a row on the heatmap
   */
  resetRowItem() {
    this.updateLeftColCase("id", null);
    this.updateSimilarityValue(null, null);
  }

  /**
   * Reset and display an empty case for the one that represents a column on the heatmap
   */
  resetColItem() {
    this.updateRightColCase("id", null);
    this.updateSimilarityValue(null, null);
  }

  /**
   * Update the similarity value between two cases. It changes the global similarity value
   * on the header and the local similarity values
   * @param newSimValue An object that contains the similarity value (with global and local similarity values)
   * @param color The color employed for the global similarity value
   */
  updateSimilarityValue(
    newSimValue: SimilarityValue | null,
    color: string | null
  ) {
    this.renderer.updateSimilarityValue(newSimValue, color);
  }

  /**
   * Modify the case  on left column of the table
   * @param id Case unique id
   * @param item Case content
   */
  private updateLeftColCase(id: string, item: Object | null) {
    this.renderer.updateLeftColCase(id, item);
  }

  /**
   * Modify the case  on the right column of the table
   * @param id Case unique id
   * @param item Case content
   */
  private updateRightColCase(id: string, item: Object | null) {
    this.renderer.updateRightColCase(id, item);
  }

 
}