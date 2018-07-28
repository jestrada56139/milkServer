
var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');


//CONNECT TO DB
mongoose.connect('mongodb://potato450:potatoman1@ds019829.mlab.com:19829/milk',  { useNewUrlParser: true }, function(err, db){
    if (err) {
        console.log('Error Connecting with mLabs', err);
        process.exit(1);
        throw err;
    } else {
        centers = db.collection("centers");
        console.log('Connected to mLabs')
    }
});

//SCHEMAS
//var problemSchema = require('./_models/problemSchema');

//MIDDLE WARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

//PULL EVENT IMAGES
app.get('/pullEventImages', function (req, res) {
    centers.find().toArray(function (err, docs) {
        if (err){
            throw err;
            res.sendStatus(500);
        } else {
            var result = docs.map(function(data) {
                return data ;
            })
            res.json(result);
        }
    })
});

app.listen(port, function () {
    console.log('listening on port: ', port);
})
