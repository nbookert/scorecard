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
                  output.sort(compare);
                  res.send(JSON.stringify(output))
              });
          });
      }
  });
});

router.get('/admissions-rate', function(req,res, next) {
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
                        ADM_RATE: 1, INSTNM: 1
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
                            ADM_RATE: Number(result[i].ADM_RATE), NAME: result[i].INSTNM
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/average-act', function(req,res, next) {
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
                        ACTCMMID: 1, INSTNM: 1
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
                            ACT_AVG: Number(result[i].ACTCMMID), NAME: result[i].INSTNM
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/enrollment', function(req,res, next) {
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
                        UGDS: 1, INSTNM: 1
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
                            ENROLL: Number(result[i].UGDS), NAME: result[i].INSTNM
                        };


                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/location', function(req,res, next) {
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
                        LATITUDE: 1, LONGITUDE: 1, INSTNM: 1
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
                            LATITUDE: Number(result[i].LATITUDE),
                            LONGITUDE: Number(result[i].LONGITUDE),
                            NAME: result[i].INSTNM

                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/graduation-rate', function(req,res, next) {
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
                        C150_4: 1, INSTNM: 1
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
                            GRAD_RATE: Number(result[i].C150_4), NAME: result[i].INSTNM
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/tuition', function(req,res, next) {
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
                        TUITIONFEE_IN: 1, INSTNM: 1, TUITIONFEE_OUT: 1
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
                            TUITIONFEE_IN: Number(result[i].TUITIONFEE_IN), NAME: result[i].INSTNM,
                            TUITIONFEE_OUT: Number(result[i].TUITIONFEE_OUT)
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/publicprivate', function(req,res, next) {
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
                        INSTNM: 1, CONTROL: 1
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
                            NAME: result[i].INSTNM, PUBLICPRIVATE: result[i].CONTROL
                        };

                        if (result[i].CONTROL == '2') {
                            inst.PUBLICPRIVATE = 'Private';
                        } else {
                            inst.PUBLICPRIVATE = "Public";
                        }
                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/average-sat', function(req,res, next) {
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
                        INSTNM: 1, SAT_AVG: 1
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
                            NAME: result[i].INSTNM, SAT_AVG: Number(result[i].SAT_AVG)
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/website', function(req,res, next) {
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
                       INSTNM: 1, INSTURL: 1
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
                            NAME: result[i].INSTNM, WEBSITE: result[i].INSTURL
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output))
                });
            });
        }
    });
});

router.get('/score', function(req,res, next) {
    let year = req.query.year;
    let collectionName = "academicyear"+year;

    MongoClient.connect("mongodb+srv://comp895va:dnjn895@hbcu-scoreboard-sjn7a.mongodb.net", function(err, client){
        if (err) {
            console.log(err);
            res.code(500);
            res.send();
        } else {
            let output = []
            let db = client.db("scorecard");
            db.collection(collectionName, function (err, collection) {
                collection.find({HBCU: "1"}, {
                    projection: {
                        INSTNM: 1, SCORE: 1
                    }
                }).toArray(function (err, result) {
                    if (err) {
                        client.close();
                        console.log(err);
                        res.code(500);
                        res.send();
                    }

                    for (let i = 0; i < result.length; i++) {
                        let inst = {
                            NAME: result[i].INSTNM, SCORE: result[i].SCORE,
                            YEAR: year
                        };

                        output.push(inst)
                    }

                    client.close();
                    output.sort(compare);
                    res.send(JSON.stringify(output));
                });
            });
        }
    });

});

function compare(a, b) {
    if (a.NAME > b.NAME) return 1;
    if (b.NAME > a.NAME) return -1;

    return 0;
}

function sendData(collectionName, query, requestedData, scoredYear, req, res, next) {

}

module.exports = router;