import Handlebars from "handlebars";

const basicAtributeTemplate: string = `
    <td class="col-4">
        {{#if theValue}}
        {{theValue}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const colorAttributeTemplate: string = `
    <td class="col-4">
        {{#if theValue}}
            {{#each theValue}}
                {{#with this}}
                <div class="box" aria-labelledby="color-label" style="background-color: rgb({{rgb}});"></div>
                {{/with}}
            {{/each}}
        {{else}}
        <span class="badge text-bg-danger">NULL</span>
        {{/if}}
    </td>
`;

const imageAttributeTemplate: string = `
    <td class="col-4">
        <img class="img-fluid" src="{{theValue}}"/>
    </td>
`;

const rowTemplate: string = `
    <tr data-att-name="{{attName}}">
        <td class="col-2">
            <div class="att-cell">
                <div class="att-name">{{attName}}</div>
                {{#if weight}}
                <div class="att-weight" data-weight="{{weight}}"></div> 
                {{else}}
                <div class="att-weight" data-weight=""></div>
                {{/if}}
            </div>  
        </td>
        <td class="col-4 item-row-cell">
        </td>
        <td class="col-2">
            <div class="att-cell">
                <div class="att-value"></div> 
            </div>                            
        </td>
        <td class="col-4 item-col-cell">
        </td>
    </tr>
`;


export default class TemplateManager {
    private static templates: {[key:string]: CallableFunction } = {    };

    static registerTemplate (name:string, template: string): boolean {
        if (name in Object.keys(this.templates)){
            return false;
        }
        else {
            this.templates[name] = Handlebars.compile(template);
            return true;
        }
    }

    static generateWithRegisteredTemplate(name:string, data:Object):string {
        let result = "";
        if (name in this.templates){
            result = this.templates[name](data);
        }
        return result;
    }

    static generate(template:string, data:Object): string {
        return Handlebars.compile(template)(data);
    }
}
