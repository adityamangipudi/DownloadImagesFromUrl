/**
 * Created by adityamangipudi1 on 4/27/15.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var async = require('async');
var MetaDataModel = require('../models/MetaDataModel');
var originURL = ''
/* GET home page. */
router.get('/', function(req, res) {
   // console.log(req.query.url)
    originURL = req.query.url;
    request(originURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           // console.log(body)
            $ = cheerio.load(body);
            var imageElems = Array.prototype.slice.call($('img'));
            imageElems = imageElems.map(function (imageElem) {
                return imageElem.attribs.src;
            });
            console.log(imageElems);

            async.parallelLimit(imageElems.map(function(url){
                return downloadFile.bind(null, url);
            }), 4, function(err, result){
                if(err) console.log('err');
                else console.log('worked');
            });



        }
    })

    res.status(200).json({message:'Got URL'})

   // res.render('index', { title: 'Express' });
});
function downloadFile(url, callback) {
    var ext = path.extname(url);
    var name = uuid.v4();
    var filename= './public/images/'+name+ext;
    var stream_w =fs.createWriteStream(filename)
    console.log(filename);



    // callback is invoked after reading the image, or writing the image is complete
    var stream_r=request(url);

    stream_r.pipe(stream_w);
    stream_r.on('error', function(err, result){
        if (err) console.log(err);
        else console.log(result);
    });
    stream_w.on('error', function(err, result){
        if (err) console.log(err);
        else console.log(result);
    })
    stream_w.on('finish', function(){
        // console.log('here');
        var obj = {origin: originURL, imageUrl:url, uuidName: (name+ext)};
       (new MetaDataModel(obj)).save(function(err, result){
            if(err) console.log(err);
            else{
                callback(null, url);


            }
        });
    });

}
module.exports = router;

