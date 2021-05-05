const mongodb = require(`mongodb`);
const dotenv = require(`dotenv`);
const mongoose = require('mongoose');

//schema
const editsubmission = require('./editsubmission.js');
const comments = require('./comments.js');
const users = require('./users.js');

dotenv.config();
const client = mongodb.MongoClient;
const url = process.env.DB_URL;
const options = { useUnifiedTopology: true};

const database = {
	insertOne: function(collection, doc){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).insertOne(doc, function(err, res){
				if(err) throw err;
				console.log(`1 document inserted`);
				db.close();
			});
		});
	},

	insertMany: function(collection, doc){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).insertMany(docs, function(err, res){
				if(err) throw err;
				console.log(`Documents inserted: ` + res.insertedCount);
				db.close();
			});
		});
	},

	findOne: function(collection, query, callback){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).findOne(query, function(err, result){
				if(err) throw err;
				res = result;
				db.close();
				console.log(result);
				return callback(result);
			});
		});
	},

	findMany: function(collection, query, callback, sort=null, projection=null){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).find(query, {projection:projection})
			.sort(sort).toArray(function(err, result){
				if(err) throw err;
				//console.log(result);
				db.close();
				return callback(result);
			});
		});
	},

	deleteOne: function(collection, filter){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).deleteOne(filter, function(err, res){
				if(err) throw err;
				console.log(`1 document deleted`);
				db.close();
			});
		});
	},


	deleteMany: function(collection, filter){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).deleteMany(filter, function(err, res){
				if(err) throw err;
				console.log(`Documents deleted: ` + res.deletedCount);
				db.close();
			});
		});
	},

	updateOne: function(collection, filter, update){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).updateOne(filter, update, function(err, res){
				if(err) throw err;
				console.log(`1 document updated`);
				db.close();
			});
		});
	},

	updateMany: function(collection, filter, update){
		client.connect(url, options, function(err, db){
			if(err) throw err;
			var database = db.db(`aesthete`);
			database.collection(collection).updateMany(filter, update, function(err, res){
				if(err) throw err;
				console.log(`Documents updated: ` + res.modifiedCount);
				db.close();
			});
		});
	}




}

module.exports = database;