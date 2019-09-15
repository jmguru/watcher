// index.js
const mymodel = require('./model.js');
const path = require('path');
const express = require('express');
const util = require('util');
const app = express();
const port = process.env.PORT || '2115';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/getfood', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    mymodel.getfood(req.query.fatty, (results) => {

        var data = [];
        var displayString="";
        for(i=0; i < results.length; i++) {
            displayString = util.format('%s %s', results[i].dt, results[i].food);
            data.push(displayString);
        }
        res.render('index', { title: 'Home', data });
    });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});