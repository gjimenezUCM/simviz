import Handlebars from "handlebars";

/**
 * A utility class for managing and generating text using templates.
 * This class acts as a wrapper of Handlebars, the engine employed to compile the templates
 * We can register templates by name for reusing them, or create the text directly using a template.
 */
export default class TemplateManager {
    /**
     * A dictionary that stores the templates registered by other objects.
     * The templates are stored as functions that are ready to use.
     */
    private static templates: {[key:string]: CallableFunction } = {    };

    /**
     * Register a template using a name
     * @param name Name of the template
     * @param template Template that must be registered
     * @returns False, if there is another template with this name,
     * so the template is not registered; and true, otherwise
     */
    static registerTemplate (name:string, template: string): boolean {
        if (name in Object.keys(this.templates)){
            return false;
        }
        else {
            this.templates[name] = Handlebars.compile(template);
            return true;
        }
    }

    /**
     * Create a string using a registered template using some data
     * @param name The name of a template already registered
     * @param data The data employed to fill in the template
     * @returns A string with the corresponding template filled in using the data provided;
     * or an empty string, if the template does not exist.
     */
    static generateWithRegisteredTemplate(name:string, data:Object):string {
        let result = "";
        if (name in this.templates){
            result = this.templates[name](data);
        }
        return result;
    }

    /**
     * Generate a string with a template and the data to fill in
     * @param template A template
     * @param data The data to fill in the template
     * @returns A string with the template filled in with the data
     */
    static generate(template:string, data:Object): string {
        return Handlebars.compile(template)(data);
    }
}
