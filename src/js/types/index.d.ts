/**
 * @types/Plotly has an error in ColorBar and it does not contain
 * an orientation property. This is a declaration merging to
 * solve this problem for out heatmap
 * @ignore
 */
namespace Plotly {
  export interface ColorBar {
    orientation?: "v" | "h";
  }
  export interface PlotData {
    ybins: {
      start: number | string;
      end: number | string;
      size: number | string;
    };
  }
}
