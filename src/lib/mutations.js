const DBConnect = require('./mongodb');

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input);
    try {
      let db = await new DBConnect().connect(); // Connect to DB
      let course = await db.collection('courses').insertOne(newCourse); // Insert the data to DB

      newCourse._id = course.insertedId;
      // Return the course created
      return await newCourse;
    } catch(error) {
      console.error(error.message);
    }
  }
};