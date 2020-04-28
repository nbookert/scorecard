var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

router.get('/institution-data', function(req,res, next) {
  MongoClient.connect("mongodb+srv://comp895va:dnjn895@hbcu-scoreboard-sjn7a.mongodb.net", function(err, client){
      if (err) {
          console.log(err);
          res.status(500);
          res.send();
      } else {
          let db = client.db("scorecard");
          db.collection('academicyear20182019', function (err, collection) {
              collection.find({HBCU: "1"}, {
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

                  output = []

                  for (let i = 0; i < result.length; i++) {
                      let inst = {
                          ADM_RATE: Number(result[i].ADM_RATE), ACT_AVG: Number(result[i].ACTCMMID),
                          ENROLL: Number(result[i].UGDS), LATITUDE: result[i].LATITUDE,
                          LONGITUDE: result[i].LONGITUDE, GRAD_RATE: Number(result[i].C150_4),
                          TUITIONFEE_IN: Number(result[i].TUITIONFEE_IN), NAME: result[i].INSTNM,
                          TUITIONFEE_OUT: Number(result[i].TUITIONFEE_OUT), PUBLICPRIVATE: result[i].CONTROL,
                          SAT_AVG: Number(result[i].SAT_AVG), WEBSITE: result[i].INSTURL, SCORE: result[i].SCORE
                      };

                      if (result[i].CONTROL == '2') {
                          inst.PUBLICPRIVATE = 'Private';
                      } else {
                          inst.PUBLICPRIVATE = "Public";
                      }
                      output.push(inst)
                  }

                  client.close();
                  res.send(JSON.stringify(output))
              });
          });
      }
  });
});

module.exports = router;