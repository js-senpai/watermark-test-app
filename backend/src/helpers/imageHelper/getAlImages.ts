import getWaterMarkImages from "./getWatermark/getWatermark";
export default class ImagesHelper extends getWaterMarkImages{
    constructor(imageFolder: string,waterMarkFolder: string){
        super(imageFolder,waterMarkFolder);
    }
}