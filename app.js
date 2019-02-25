const Subject = require('./CourseInfo/Subject');
const Course = require('./CourseInfo/Course');
const Section = require('./CourseInfo/Section');

const MongoClient = require('mongodb').MongoClient;
const MONGO_ATLAS_PW = require('./mongo_pw.js');
const uri = "mongodb+srv://write-user:" + MONGO_ATLAS_PW + "@ubc-web-api-zvc60.mongodb.net/test?retryWrites=true";

const fs = require('fs');

const dbName = "2019S";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err) {
    throw err;
  }
  
  const db = client.db(dbName);

  // Create collections in database
  const subjectTreeCollection = db.collection('treeSubjects');
  const subjectCollection = db.collection('subjects');

  const courseTreeCollection = db.collection('courseTrees');
  const courseCollection = db.collection('courses');

  const sectionCollection = db.collection('sections');

  // Generate all documents for each collection
  let jsonTree = JSON.parse(fs.readFileSync('./data/UBC-Courses-' + dbName + '.json'));
  
  let subjectTrees = Object.keys(jsonTree).map(key => jsonTree[key]);
  let subjects = [];

  let courseTrees = [];
  let courses = [];

  let sections = [];


  for (let subject of subjectTrees) {
    // console.log(Object.keys(subject.courses));
    subjects.push(new Subject(subject));
    for (let course of Object.values(subject.courses)) {
      courseTrees.push(course);
      courses.push(new Course(course));
      for (let section of Object.values(course.sections)) {
        sections.push(section);
      }
    }
  }

  // console.log("Ok here");
  
  // Insert collections into database
  subjectTreeCollection.insertMany(subjectTrees)

  .then(subjectCollection.insertMany(subjects))

  .then(courseTreeCollection.insertMany(courseTrees))

  .then(courseCollection.insertMany(courses))

  .then(sectionCollection.insertMany(sections))

  .then(function () {
    // console.log("Ok here too");
    client.close();
  });
});

const insertDocuments = function(db, callback) {

  // Create collections in database
  const subjectTreeCollection = db.collection('treeSubjects');
  const subjectCollection = db.collection('subjects');

  const courseTreeCollection = db.collection('treeCourses');
  const courseCollection = db.collection('courses');

  const sectionCollection = db.collection('sections');

  // Generate all documents for each collection
  let jsonTree = JSON.parse(fs.readFileSync('./data/UBC-Courses-' + dbName + '.json'));
  
  let subjectTrees = Object.keys(jsonTree).map(key => jsonTree[key]);
  let subjects = [];

  let courseTrees = [];
  let courses = [];

  let sections = [];


  for (let subject of subjectTrees) {
    // console.log(Object.keys(subject.courses));
    subjects.push(new Subject(subject));
    for (let course of Object.values(subject.courses)) {
      courseTrees.push(course);
      courses.push(new Course(course));
      for (let section of Object.values(course.sections)) {
        sections.push(section);
      }
    }
  }
  
  // Insert collections into database
  subjectTreeCollection.insertMany(subjectTrees)

  .then(subjectCollection.insertMany(subjects))

  .then(courseTreeCollection.insertMany(courseTrees))

  .then(courseCollection.insertMany(courses))

  .then(sectionCollection.insertMany(sections));

  // callback();
}
