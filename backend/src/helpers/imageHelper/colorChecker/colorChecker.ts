import Vibrant = require('node-vibrant');
import ImageChecker from "../imageChecker/imageChecker";
export default class ColorChecker extends ImageChecker{
    constructor(imageFolder: string,waterMarkFolder: string){
        super(imageFolder,waterMarkFolder);
    }
    /* Check color of images */
    checkColor = async (): Promise<any> => {
        return await this.getImages().then(async (imagesArray): Promise<any> =>{
            const newImages = imagesArray;
                for(let count = 0;count<newImages.images.length;count++){
                    // @ts-ignore
                    newImages.images[count].colorImg = await Vibrant.from(newImages.images[count].oldImg).getPalette().then((palette)=> {
                        let maxIndex,maxValue;
                        for(let i = 0;i<palette.Vibrant.getRgb().length;i++){
                            if( typeof maxValue === "undefined" || palette.Vibrant.getRgb()[i] > maxValue ) {
                                maxValue = palette.Vibrant.getRgb()[i];
                                maxIndex = i;
                            }
                        }
                        switch (maxIndex) {
                            case 0:
                                return  'red';
                            case 1:
                                return 'green';
                            case 2:
                                return  'blue';
                        }
                    }).catch((error)=>{
                        console.error(error);
                    });
                }
            return newImages;
        });
    };
}