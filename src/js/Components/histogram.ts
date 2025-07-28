import Plotly, { PlotlyHTMLElement } from "plotly.js-dist-min";
import { PlotEventNotifier } from "../plotObserver";

/**
 * Histogram colors
 */
const magmaColorscaleValue: Array<string> = [
  "#000004",
  "#180f3d",
  "#440f76",
  "#721f81",
  "#9e2f7f",
  "#cd4071",
  "#f1605d",
  "#fd9668",
  "#feca8d",
  "#fcfdbf",
];

/**
 * The class that plots and stores the histogram, which represents
 * the distribution of the similarity values over a casebase.
 * This histogram is interactive, so when the user clicks on a column/bucket,
 * the class notifies to its observers the information about a pair of cases
 * whose similarity value lies in the bucket clicked. For this reason,
 * this class implements the PlotEventNotifier
 */
export class Histogram extends PlotEventNotifier {
  /**
   * HTML element where the histogram is drawn
   */
  private containerNode: HTMLElement;

  /**
   * A list with the similarity values used in the plot
   */
  private simValues: Array<number>;

  /**
   * An index for simValues. Each position k contains a pair [id1, id2]
   * so simValues[k] contains the similarity value between id1 and id2
   */
  private simValueIndex: Array<[string, string]>;

  /**
   * Constructor
   * @param ids A list with the unique ids of a casebase
   * @param matrix A similarity matrix
   * @param containerNode The HTML node that will contain the histogram (can be null)
   */
  constructor(
    ids: Array<string>,
    matrix: Array<Array<number>>,
    containerNode: HTMLElement | null
  ) {
    super();
    if (containerNode) {
      this.simValueIndex = [];
      this.simValues = [];
      // Create the index and the simvalues using the similarity matrix and the ids
      for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < ids.length; j++) {
          let curIndex = j * i + j;
          this.simValueIndex[curIndex] = [ids[i], ids[j]];
          this.simValues[curIndex] = matrix[i][j];
        }
      }
      this.containerNode = containerNode;
      this.init();
    }
  }

  /**
   * Initialize the histogram with the data provided on creation
   */
  init() {
    let containerWidth = this.containerNode.offsetWidth;
    let containerHeight = this.containerNode.parentNode
      ? (<HTMLElement>this.containerNode.parentNode).offsetHeight
      : 0;
    let trace: Plotly.Data = {
      y: this.simValues,
      type: "histogram",
      histnorm: "percent",
      ybins: {
        start: 0.0,
        size: 0.10000001, // This way, last bucket contains 1.0 and do not push the other buckets
        end: 1.0,
      },
      marker: {
        color: magmaColorscaleValue,
      },
      hovertemplate: "%{x}%<extra></extra>",
    };
    let layout: Partial<Plotly.Layout> = {
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      margin: {
        l: 0,
        r: 20,
        b: 0,
        t: 0,
      },
      xaxis: {
        // No tick labels
        showticklabels: false,
        // No ticks
        tickmode: "array",
        tickvals: [],
      },
      yaxis: {
        // No tick labels
        showticklabels: false,
        // No ticks
        tickmode: "array",
        tickvals: [],
      },
      hoverlabel: {
        bgcolor: "aliceblue",
        font: {
          color: "black",
          size: 16,
        },
      },
      height: containerHeight,
      width: containerWidth,
    };
    let config = { responsive: true };
    Plotly.newPlot(this.containerNode, [trace], layout, config);
    // Suscribe to plotly click events
    (<PlotlyHTMLElement>this.containerNode).on("plotly_click", (data) =>
      this.onClickHistogram(data)
    );
  }

  /**
   * Create the data for the PlotEvent handlers and notify them
   * @param data The data provided by Plotly
   */
  private onClickHistogram(data: any) {
    if (data.points.length === 1) {
      // Choose a random similarity value that lies in the clicked bucket
      let randomValue =
        data.points[0].pointIndices[
          Math.floor(Math.random() * data.points[0].pointIndices.length)
        ];
      // Create the PlotEvent data and notify the handlers
      this.notify({
        id1: this.simValueIndex[randomValue][0],
        id2: this.simValueIndex[randomValue][1],
        similarityValue: this.simValues[randomValue],
        color: magmaColorscaleValue[~~(this.simValues[randomValue] * 10)],
      });
    }
  }

  /**
   * Invoked when the user resizes the layout
   */
  refresh() {
    this.init();
  }
}
