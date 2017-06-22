/* 
  This script is listening for an input and add it to mongoDB.
  Pipe a json file to this script:
  $tail -F -n 0 file.json|node parserlog.js
*/
var mongodb = require("mongodb");
var colors = require('colors');
var db_name='nginX';
var msg ='nginX log to MongoDb';
var up = 'db updated';
console.log('                 ######################'.cyan);
console.log('                 #'.cyan+msg.green+'#'.cyan);
console.log('                 ######################'.cyan);
console.log('Waiting for incoming data:'.green);

process.stdin.pipe(require('split')()).on('data', processLine);

function processLine (line) {
	mongodb.MongoClient.connect("mongodb://localhost/"+db_name, function(error, db) {
		if (error) return funcCallback(error.red);
		console.log("Connecté à la base de données ".green+db_name.yellow);
		var obj = JSON.parse(line);
		//console.log(obj);
		
		db.collection(db_name).insert(obj, function(err) {
			if (err) throw err;
			console.log(up.magenta);
			db.collection(db_name).find()
			});
		
});
}




