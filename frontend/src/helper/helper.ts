import axios from 'axios';
export default class RequestHelper{
    protected _url: any= 'http://localhost:8084';
    /* Get new images */
    getAllImages = async () =>{
        return await axios({
            url: `${this._url}/getImages/`,
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
        }).then((images)=>{
            const newImgArr = [],
                  oldImgArr = images.data;
            for(let i = 0;i<oldImgArr.length;i++){
                oldImgArr[i].newImg = `${this._url}${oldImgArr[i].newImg}`;
                newImgArr.push({newImg:oldImgArr[i].newImg,currentColor: oldImgArr[i].colorImg});
            }
            return newImgArr;
        }).catch((error)=>{
            console.error(error);
        })
    }
}