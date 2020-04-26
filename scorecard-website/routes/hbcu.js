var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

/*Get from class collection */
router.get('/scores', function(req, res, next) {
    let hbcu = req.query.HBCU;
    MongoClient.connect("mongodb://localhost", function (err, client) {
        let db = client.db("finalproject");
        db.collection('scores', function (err, collection) {
            if (hbcu == "1") {
                collection.find().toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.send();
                    }

                    res.send(JSON.stringify(result));
                });
            } else {
                collection.find().toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.send();
                    }

                    res.send(JSON.stringify(result));
                });
            }
        });
    });
});

router.get('/institution-data', function(req,res, next) {
  MongoClient.connect("mongodb://localhost", function(err, client){
     let db = client.db("finalproject");
     db.collection('institution1819', function(err, collection) {
        collection.find({HBCU:"1"},{projection: {ADM_RATE: 1, ACTCMMID: 1, UGDS: 1, LATITUDE: 1, LONGITUDE: 1, C150_4: 1, TUITIONFEE_IN: 1,
            INSTNM: 1, TUITIONFEE_OUT: 1, CONTROL: 1, SAT_AVG: 1, INSTURL: 1}}).toArray(function(err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send();
            }

            output = []

            for (let i = 0; i < result.length; i++) {
                let inst = {ADM_RATE: Number(result[i].ADM_RATE), ACT_AVG: Number(result[i].ACTCMMID),
                    ENROLL: Number(result[i].UGDS), LATITUDE: result[i].LATITUDE,
                    LONGITUDE: result[i].LONGITUDE, GRAD_RATE: Number(result[i].C150_4),
                    TUITIONFEE_IN: Number(result[i].TUITIONFEE_IN), NAME: result[i].INSTNM,
                    TUITIONFEE_OUT: Number(result[i].TUITIONFEE_OUT), PUBLICPRIVATE: result[i].CONTROL,
                    SAT_AVG: Number(result[i].SAT_AVG), WEBSITE: result[i].INSTURL};

                if (result[i].CONTROL == '2') {
                    inst.PUBLICPRIVATE = 'Private';
                }
                else {
                    inst.PUBLICPRIVATE = "Public";
                }
                output.push(inst)
            }

            res.send(JSON.stringify(output))
        }) ;
     });
  });
});

module.exports = router;