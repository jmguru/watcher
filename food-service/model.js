// model.js
const mysql      = require('mysql');
const util       = require('util');
const moment     = require('moment');
const YAML       = require('yaml');
const fs         = require('fs');
const file       = fs.readFileSync('./config.yaml', 'utf8');
var config       = YAML.parse(file);

const tName = config.tName;

var connection = mysql.createConnection({
  host     : process.env.DBHOST || config.dbHost,
  user     : config.dbUser,
  password : config.dbPass,
  database : config.dbName
});
 
exports.getfood = function(fatty, cb) {
    let today = moment().format('YYYY-MM-DD');
    var myquery = util.format('SELECT dt, food from foodbase.fooddata where fatty=\'%s\' AND dt > \'%s\'',fatty,today);
    connection.query(myquery, function (error, results, fields) {
        if (error) {
            throw error;
        }
        cb(results,null); 

    });
}

exports.putfood = function(fatty, foodd, cb) {
    let today = 'now()';
    const stmt = util.format('INSERT INTO %s(fatty, dt, food) VALUES (\'%s\',%s,\'%s\')', tName, fatty, today, foodd);
    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
    });
}

