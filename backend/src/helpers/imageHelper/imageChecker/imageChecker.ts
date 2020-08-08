import fs = require('fs');
export default class ImageChecker{
    protected _currentImages: unknown = [];
    protected _waterMarkImages: unknown = null;
    protected _imageFolder: string = '';
    protected _waterMarkFolder: string = '';
    constructor(imageFolder: string,waterMarkFolder: string){
        this._imageFolder = imageFolder;
        this._waterMarkFolder = waterMarkFolder;
    }
    /* Get new array of images */
    getImages = async (): Promise<any> =>{
        return await this.putImagesToArray().then((imgArray)=>{
            return imgArray;
        });
    };
    /* Put images to new array */
    putImagesToArray = async (): Promise<any> =>{
        this._currentImages = await this.getFolder(this._imageFolder,true).then(data=>data);
        this._waterMarkImages = await this.getFolder(this._waterMarkFolder,false).then(data=>data);
        return {
            images: this._currentImages,
            watermarks: this._waterMarkImages
        };
    };
    /* Get folder of images */
    getFolder = async (folder: string,isCurrentImgs: boolean): Promise<any> =>{
        const checkTypeImages = /\.(jpg|png|jpeg)/;
        const filesArray: any[] = [];
        return await new Promise((resolve,reject)=>{
            fs.readdir(folder, (err: any, files: any[]) => {
                const currentDate: any = new Date();
                let idCount: number = 0;
                files.forEach(file => {
                    if(checkTypeImages.test(file)){
                        if(isCurrentImgs){
                            idCount+=1;
                            filesArray.push({id:currentDate.getTime()+idCount,oldImg:`${folder}${file}`,newImg: '',colorImg: '',watermark: ''});
                        }else{
                            filesArray.push(`${folder}${file}`);
                        }
                    }
                });
                if(filesArray.length>0) {
                    resolve(filesArray);
                }else{
                    reject(new Error('Произошла ошибка. Кажется вы указали неправильный путь или же в папке нет картинок.'));
                }
            });
        });
    }
}