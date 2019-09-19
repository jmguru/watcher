// Need to create schema first fatty
const mysql      = require('mysql');
const util       = require('util');
const moment     = require('moment');
const YAML       = require('yaml');
const fs         = require('fs');
const file       = fs.readFileSync('./config.yaml', 'utf8');
var config       = YAML.parse(file);

const tName = config.tName;

var connection = mysql.createConnection({
  host     : config.dbHost,
  user     : config.dbUser,
  password : config.dbPass,
  database : config.dbName
});
 
exports.getfood = function(fatty, cb) {
    let today = moment().format('YYYY-MM-DD');
    //let startTime = util.format('%s 00:00:00',today);
    //let endTime = util.format('%s 11:59:59',today);
    //var dstmt = util.format('( dt > \'%s\' AND dt < \'%s\' )',startTime,endTime);
    var myquery = util.format('SELECT dt, food from foodbase.fooddata where fatty=\'%s\' AND dt > \'%s\'',fatty,today);
    console.log(myquery);
    connection.query(myquery, function (error, results, fields) {
        if (error) {
            throw error;
            connection.end();
            return(err);
        }
        cb(results,null); 

    });

}

exports.putfood = function(fatty, foodd, cb) {
    //let today = moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
    let today = 'now()';
    const stmt = util.format('INSERT INTO %s(fatty, dt, food) VALUES (\'%s\',%s,\'%s\')', tName, fatty, today, foodd);
    console.log(stmt);
    // execute the insert statment
    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Todo Id:' + results.insertId);
    });
}