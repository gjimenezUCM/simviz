const FILEPATH ="./data/";
const FILEEXTENSION = ".json";

export class FileLoader {
    constructor() {
        this.fileList = [
            "simAvgColor",
            "simDecades",
            "simMaxColor"
        ];
        this.fileData = {};
    }
    getFiles(){
        return this.fileList;
    }
    async getDataFileByName(name){
        if (name in this.fileData) {
            return this.fileData[name];
        }
        else {
                const data = await this.loadData(name);
                if (data !== null) {
                    this.fileData[name] = data;
                }
                return data;
        }
    }

    async loadData(fileName){
        const response = await fetch(FILEPATH+fileName+FILEEXTENSION);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            window.alert("Unable to load file:", fileName);
            return null;
        }
    }
}