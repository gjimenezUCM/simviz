const FILEPATH ="./data/";
const FILEEXTENSION = ".json";

export class FileLoader {
    constructor() {
        this.fileList = [
            "simAvgColor",
            "simDecades",
            "simMaxColor"
        ];
        this.fileData = [];
    }
    getFiles(){
        return this.fileList;
    }
    async getDataFileByIndex(index){
        if (index>=0 && index<this.fileData.length) {
            return this.fileData[index];
        }
        else {
            if (index >= 0 && index < this.fileList.length){
                const data = await this.loadData(this.fileList[index]);
                if (data !== null) {
                    this.fileData[index] = data;
                }
                return data;

            } else {
                return null;
            }
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