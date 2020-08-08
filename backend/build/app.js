"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var getAlImages_1 = __importDefault(require("./helpers/imageHelper/getAlImages"));
var jsonParser = bodyParser.json();
var imageHelper = new getAlImages_1.default('./src/images/currentImg/', './src/images/watermarks/');
//Settings for localhost
imageHelper.setWatermark();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.get('/src/images/newImages/*', jsonParser, function (request, response) {
    // получаем путь после слеша
    var filePath = request.url.substr(1);
    fs.readFile(filePath, function (error, data) {
        if (error) {
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else {
            response.end(data);
        }
    });
});
app.get('/getImages/', jsonParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(400);
    imageHelper.getImagesWithWatermark().then(function (images) {
        console.log(images);
        res.send(images);
    }).catch(function (error) {
        res.statusCode = 404;
        res.end("Resourse not found!");
        console.error(error);
    });
});
// начинаем прослушивать подключения на 3000 порту
app.listen(8084);
