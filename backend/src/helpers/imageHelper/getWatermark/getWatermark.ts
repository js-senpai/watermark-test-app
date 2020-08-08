import ColorChecker from "../colorChecker/colorChecker";
import Jimp = require("jimp");
export default class getWaterMarkImages extends ColorChecker{
    imagesWithWaterMark: any = null;
    constructor(imageFolder: string,waterMarkFolder: string){
        super(imageFolder,waterMarkFolder);
    }
    /* Get images */
    getImagesWithWatermark = async (): Promise<any> =>{
        return await new Promise((resolve) =>{
            resolve(this.imagesWithWaterMark);
        } )
    };
    /* Set watermarks links for every image */
    analyzeImages = async () =>{
        return await this.checkColor().then((images): any =>{
           const currentImages  = images;
           for(let i = 0;i<currentImages.images.length;i++){
               if(currentImages.images[i].colorImg === 'red') {
                   currentImages.images[i].watermark = currentImages.watermarks[0];
               }else if(currentImages.images[i].colorImg === 'green'){
                   currentImages.images[i].watermark = currentImages.watermarks[1];
               }else if(currentImages.images[i].colorImg === 'blue'){
                   currentImages.images[i].watermark = currentImages.watermarks[2];
               }
           }
           return currentImages;
        });
    };
    /* Set watermark */
    setWatermark = (): void =>{
        this.imagesWithWaterMark = this.analyzeImages().then((currentImages): any =>{
            for(let i = 0; i<currentImages.images.length;i++){
                this.putNewImages(currentImages.images[i].oldImg,currentImages.images[i].watermark).then((image)=>{
                    image.write(currentImages.images[i].oldImg.replace('currentImg','newImages'));
                });
                currentImages.images[i].newImg = currentImages.images[i].oldImg.replace('currentImg','newImages').replace('./','/');
            }
            return  currentImages.images;
        }).catch((error)=>{
            console.error(error);
        });
    };
    /* Put images to folder */
    putNewImages = async (img: string,watermark: string): Promise<any> =>{
        const [image, logo] = await Promise.all([
            Jimp.read(img),
            Jimp.read(watermark)
        ]);

        logo.resize(image.bitmap.width / 10, Jimp.AUTO);

        const xMargin = (image.bitmap.width /2) - logo.bitmap.width / 2;
        const yMargin = (image.bitmap.width /2);

        const X = image.bitmap.width - logo.bitmap.width - xMargin;
        const Y = image.bitmap.height - logo.bitmap.height - yMargin;

        // @ts-ignore
        return image.composite(logo, X, Y, [
            {
                mode: Jimp.BLEND_SCREEN,
                opacitySource: 0.1,
                opacityDest: 1
            }
        ]);
    }
}