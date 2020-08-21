const DBConnect = require('./mongodb');
const { ObjectId} = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  //Return all the courses
  getCourses: async () => {
    try {
      let db= await new DBConnect().connect(); // Create Connection
      let courses = await db.collection('courses').find().toArray(); // Get courses
      // Return the data courses
      return await courses;
    } catch(error) {
      errorHandler(error);
    }
  },
  // Return a course
  getCourse: async (root, { id }) => {
    try {
      let db = await new DBConnect().connect(); // Create DB Instance
      let course = await db.collection('courses').findOne({ _id: ObjectId(id) }); // Get the course
      // Return the data course
      return await course;
    } catch(error) {
      errorHandler(error);
    }
  },
  //Return all the students
  getStudents: async () => {
    try {
      let db= await new DBConnect().connect(); // Create Connection
      let students = await db.collection('students').find().toArray(); // Get courses
      // Return the data courses
      return await students;
    } catch(error) {
      errorHandler(error);
    }
  },
  // Return a student
  getStudent: async (root, { id }) => {
    try {
      let db = await new DBConnect().connect(); // Create DB Instance
      let student = await db.collection('students').findOne({ _id: ObjectId(id) }); // Get the course
      // Return the data course
      return await student;
    } catch(error) {
      errorHandler(error);
    }
  },
  // Search an item
  searchItems: async (root, { keyword }) => {
    try {
      let db = await new DBConnect().connect();
      let courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray();
      let students = await db.collection('students').find({ $text: { $search: keyword } }).toArray();
      let items = [...courses, ...students];

      return items;
    } catch(error) {
      errorHandler(error);
    }
  }
}