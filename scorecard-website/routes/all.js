var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

/*Get from class collection */
router.get('/mean-values', function(req, res, next) {
    MongoClient.connect("mongodb+srv://comp895va:dnjn895@hbcu-scoreboard-sjn7a.mongodb.net", function(err, client) {
        if (err) {
            console.log(err);
            res.status(500);
            res.send();
        } else {
            let db = client.db("scorecard");

            db.collection('academicyear20182019', function (err, collection) {
                collection.find({}, {
                    projection: {
                        ADM_RATE: 1, ACTCMMID: 1, UGDS: 1, LATITUDE: 1, LONGITUDE: 1, C150_4: 1, TUITIONFEE_IN: 1,
                        INSTNM: 1, TUITIONFEE_OUT: 1, CONTROL: 1, SAT_AVG: 1, INSTURL: 1, SCORE: 1
                    }
                }).toArray(function (err, result) {
                    if (err) {
                        client.close();
                        console.log(err);
                        res.status(500);
                        res.send();
                    }

                    let totalValues = {
                        ACT_AVG: 0,
                        ADM_RATE: 0,
                        GRAD_RATE: 0,
                        SAT_AVG: 0,
                        TUITIONFEE_IN: 0,
                        TUITIONFEE_OUT: 0,
                        ENROLL: 0,
                        SCORE: 0
                    };
                    let participantInst = {
                        ACT_AVG: 0,
                        ADM_RATE: 0,
                        GRAD_RATE: 0,
                        SAT_AVG: 0,
                        TUITIONFEE_IN: 0,
                        TUITIONFEE_OUT: 0,
                        ENROLL: 0,
                        SCORE: 0
                    };

                    for (let i = 0; i < result.length; i++) {
                        if (Number(result[i].ACTCMMID)) {
                            totalValues.ACT_AVG += Number(result[i].ACTCMMID);
                            participantInst.ACT_AVG += 1
                        }

                        if (Number(result[i].ADM_RATE)) {
                            totalValues.ADM_RATE += Number(result[i].ADM_RATE);
                            participantInst.ADM_RATE += 1
                        }

                        if (Number(result[i].C150_4)) {
                            totalValues.GRAD_RATE += Number(result[i].C150_4);
                            participantInst.GRAD_RATE += 1
                        }

                        if (Number(Number(result[i].SAT_AVG))) {
                            totalValues.SAT_AVG += Number(result[i].SAT_AVG);
                            participantInst.SAT_AVG += 1
                        }

                        if (Number(result[i].TUITIONFEE_IN)) {
                            totalValues.TUITIONFEE_IN += Number(result[i].TUITIONFEE_IN);
                            participantInst.TUITIONFEE_IN += 1
                        }

                        if (Number(result[i].TUITIONFEE_OUT)) {
                            totalValues.TUITIONFEE_OUT += Number(result[i].TUITIONFEE_OUT);
                            participantInst.TUITIONFEE_OUT += 1
                        }

                        if (Number(result[i].UGDS)) {
                            totalValues.ENROLL += Number(result[i].UGDS);
                            participantInst.ENROLL += 1
                        }

                        if (Number(result[i].SCORE)) {
                            totalValues.SCORE += Number(result[i].SCORE);
                            participantInst.SCORE += 1;
                        }
                    }

                    let numberOfInstitutions = result.length;
                    let avgValues = {
                        ACT_AVG: totalValues.ACT_AVG / participantInst.ACT_AVG,
                        ADM_RATE: totalValues.ADM_RATE / participantInst.ADM_RATE,
                        GRAD_RATE: totalValues.GRAD_RATE / participantInst.GRAD_RATE,
                        SAT_AVG: totalValues.SAT_AVG / participantInst.SAT_AVG,
                        TUITIONFEE_IN: totalValues.TUITIONFEE_IN / participantInst.TUITIONFEE_IN,
                        TUITIONFEE_OUT: totalValues.TUITIONFEE_OUT / participantInst.TUITIONFEE_OUT,
                        ENROLL: totalValues.ENROLL / participantInst.ENROLL,
                        SCORE: totalValues.SCORE / participantInst.SCORE
                    };
                    //console.log(avgValues);
                    client.close();
                    res.send(JSON.stringify(avgValues));
                });
            });
        }
    });
});


module.exports = router;