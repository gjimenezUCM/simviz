export class ItemDAO {
    constructor(jsonContent) {
        this.data = jsonContent.data;
        this.description = jsonContent.description;
        this.attributes = jsonContent.attributes;
        this.dataId = jsonContent.id;
        this.ids = this.generateIds(this.data);
    }

    generateIds(data) {
        let idList = [];
        let i = 0;
        for (const item of data) {
            idList[i] = item[this.dataId].toString();
            i++;
        }
        return idList;
    }

    getIds() {
        return this.ids;
    }

    getNumInstances(){
        return this.ids.length;
    }

    getAttId() {
        return this.dataId;
    }

    getAttributes() {
        return this.attributes;
    }

    getItemById(id) {
        let index = this.ids.indexOf(id);
        return index === -1 ? null : this.data[index];
    }
}
