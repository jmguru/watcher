// Need to create schema first fatty
const mysql      = require('mysql');
const util       = require('util');

var connection = mysql.createConnection({
  host     : '192.168.1.221',
  user     : 'root',
  password : '1234',
  database : 'foodbase'
});
 
exports.getfood = function(fatty, cb) {
    const myquery = util.format('SELECT dt, food from foodbase.fooddata where fatty=\'%s\'',fatty)
    connection.connect();
    connection.query(myquery, function (error, results, fields) {
        if (error) {
            throw error;
            connection.end();
            return(err);
        }
        cb(results,null); 

    });
    connection.end();
}

