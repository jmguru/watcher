// index.js
const mymodel     = require('./model.js');
const path        = require('path');
const express     = require('express');
const util        = require('util');
const moment      = require('moment');
const app         = express();
const YAML        = require('yaml');
const fs          = require('fs');
const file        = fs.readFileSync('./config.yaml', 'utf8');
var config        = YAML.parse(file);

const port = process.env.PORT || config.appPort;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { "title": 'Home'});
});

app.get('/submit', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  mymodel.putfood(req.query.fatty, req.query.foodtext, (results) => {
      if(results)
        console.log('Data inserted.');
  });

  // Refresh with new item
  mymodel.getfood(req.query.fatty, (results) => {

    var myData = [];
    var displayString='';
    for(i=0; i < results.length; i++) {
        let shortDate = moment(results[i].dt).format('YYYY-MM-DD-hh:mm a - ');
        displayString = util.format('%s %s', shortDate, results[i].food);
        myData.push(displayString);
    }
    
    res.render('index', { "title": 'Home', "data": myData, "selFatty": req.query.fatty });
  });
});

app.get('/getfood', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    mymodel.getfood(req.query.fatty, (results) => {
        var myData = [];
        var displayString="";
        for(i=0; i < results.length; i++) {
            let shortDate = moment(results[i].dt).format('YYYY-MM-DD-hh:mm a - ');
            displayString = util.format('%s %s', shortDate, results[i].food);
            myData.push(displayString);
        }
        res.render('index', { "title": 'Home', "data": myData, "selFatty": req.query.fatty });

    });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});