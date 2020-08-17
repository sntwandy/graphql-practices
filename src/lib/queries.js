const DBConnect = require('./mongodb');
const { ObjectId} = require('mongodb');

module.exports = {
  //Return all the courses
  getCourses: async () => {
    try {
      let db= await new DBConnect().connect(); // Create Connection
      let courses = await db.collection('courses').find().toArray(); // Get courses
      // Return the data courses
      return await courses;
    } catch(error) {
      console.error(error.message);
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
      console.error(error.message);
    }
  }
}