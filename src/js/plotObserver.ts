/**
 * Types and classes for event notifications when the user clicks on a plot
 * The events are specific for SimViz because they include information about the cases
 * and the similarity valua and colors represented when clicking on a plot
 */


/**
 * Data notified on a plot event
 */
export class PlotEventData {
    /**
     * Case ids returned by the click event
     */
    id1: string;
    id2: string;

    /**
     * The similarity value between cases
     */
    similarityValue: number;

    /**
     * The color employed in the plot on the position clicked
     */
    color: string
}

/**
 * Handler function for plot events
 */
export type PlotEventHandler = (source: PlotEventNotifier, data: PlotEventData)=> void;

/**
 * Abstract class employed to implement the basic behaviour of notifying
 * plot events and suscribing to them
 */
export abstract class PlotEventNotifier {

    /**
     * The functions called on notification
     */
    private handlers: Array<PlotEventHandler> = [];

    /**
     * Notify to every handler a plot event 
     * @param data Plot event data
     */
    protected notify(data:PlotEventData): void {
        // Duplicate the array to avoid side effects during iteration.
        this.handlers.slice(0).forEach(h => h(this, data));
    }

    /**
     * Register a handler to be notified for plot events
     * @param handler The handler that is going to be registered to this notifier
     */
    public on(handler: PlotEventHandler): void {
        this.handlers.push(handler);
    }

    /**
     * Deregister a handler to this notifier
     * @param handler The handler that is going to be deregistered to this notifier
     */
    public off(handler: PlotEventHandler): void {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
}   