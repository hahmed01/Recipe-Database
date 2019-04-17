var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_atenj',
  password        : '9098',
  database        : 'cs340_atenj',
  multipleStatements : true
});
module.exports.pool = pool;
