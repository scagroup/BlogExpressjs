"use strict"
const client = require('mongodb').MongoClient;
const url_database = 'mongodb://';
const nameDB = "blog";
const nameCollection = "blog"

function getRoute(url){
    return new Promise((resolve, reject) => {
    	client.connect(url_database, {useNewUrlParser: true}, function (err, database) {
            if (!err) {
                var db = database.db(nameDB);
                var collection = db.collection(nameCollection);
                var col = collection.find({"url": url});
                col.toArray(function (err, res) {
                    if(!err){
                        resolve(res);
                    }else{
                        reject(res);
                    }
                    database.close();
                })
            } else {
                console.log(err);
                reject(res);
            }
        });
    }); 
}

module.exports.getRoute = getRoute;  

 