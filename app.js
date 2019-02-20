const MongoClient = require('mongodb').MongoClient;
const MONGO_ATLAS_PW = require('./mongo_pw.js');
const uri = "mongodb+srv://write-user:" + MONGO_ATLAS_PW + "@ubc-web-api-zvc60.mongodb.net/test?retryWrites=true";
// const uri = "mongodb+srv://write-user:writepassword@ubc-web-api-zvc60.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const fs = require('fs');

const dbName = "UBC-Courses";

client.connect(err => {
  // const collection = client.db("test").collection("devices");
 // perform actions on the collection object

  const db = client.db(dbName);
  // insertDocuments(db, function() {
    findDocuments(db, function() {
      client.close();
    });
  // });
});



const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Subjects');
  // Insert some documents
  let CoursesMap = JSON.parse(fs.readFileSync('UBC-Courses.json'));
  // console.log(CoursesMap);

  const CoursesList = Object.keys(CoursesMap).map(key => CoursesMap[key]);

  // let CoursesList =[ ...CoursesMap.values() ];

  collection.insertMany(CoursesList), function (err, result) {
    console.log("Inserted Map");
    callback(result);
  }
}

const findDocuments = function(db, callback) {
  let queryObject = {code: "CPSC"};
  // Get the documents collection
  const collection = db.collection('Subjects');
  // Find some documents
  collection.find({code: "CPSC"}).toArray(function(err, docs) {
    console.log(docs)
    callback(docs);
  });
}
