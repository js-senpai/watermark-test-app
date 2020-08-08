import express = require('express');
const app = express();
import fs = require("fs");
import bodyParser = require("body-parser");
import ImagesHelper from "./helpers/imageHelper/getAlImages";
const jsonParser = bodyParser.json();
const imageHelper = new ImagesHelper('./src/images/currentImg/','./src/images/watermarks/');
//Settings for localhost
imageHelper.setWatermark();
app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) :void=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.get('/src/images/newImages/*',jsonParser,function(request,response):void {
    // получаем путь после слеша
    const filePath = request.url.substr(1);
    fs.readFile(filePath, function(error, data){
        if(error){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            response.end(data);
        }
    });
});
app.get('/getImages/',jsonParser,(req: any,res: any):void =>{
    if(!req.body) return res.sendStatus(400);
    imageHelper.getImagesWithWatermark().then((images: any)=>{
        console.log(images);
        res.send(images);
    }).catch((error)=>{
        res.statusCode = 404;
        res.end("Resourse not found!");
        console.error(error);
    });
});
// начинаем прослушивать подключения на 3000 порту
app.listen(8084);