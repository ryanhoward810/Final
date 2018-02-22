var mysql = require('mysql');
var connection;
// var host = process.env.CLEARDB_DATABASE_URL || '127.0.0.1';

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
  connection = mysql.createConnection({
    // host     : 'gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    // user     : 'fntk3dec11cghkmf',
    // password : 'qf680nyzltr3c8f4',
    // database : 'wy0d1j17bijzbi14'
      host     : 'localhost',
      user     : 'root',
      password : 'Mayonaise1!',
      database : 'burgers_db'
  });
};

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

});

module.exports = connection;