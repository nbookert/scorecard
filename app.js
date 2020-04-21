const express = require('express');
const app = express();
var router = express.Router();
const path = require('path');
app.use(express.static('public'))

const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

router.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/hbcu-scorecard.html'));
    
});

app.use('/',router)
