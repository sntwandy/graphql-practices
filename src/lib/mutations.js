const DBConnect = require('./mongodb');
const { ObjectId } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  // Create a course
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
      errorHandler(error);
    }
  },
  // Edit a course
  editCourse: async (root, { _id, input }) => {
    try {
      let db = await new DBConnect().connect(); // Make the connection to DB
      await db.collection('courses').updateOne( { _id: ObjectId(_id) }, { $set: input } ); // Sent ID and input info to update
      let course = await db.collection('courses').findOne({ _id: ObjectId(_id) }); // get the course that was updated
      return await course; // Return the course that was updated
    } catch(error) {
      errorHandler(error);
    }
  },
  // Delete a course
  deleteCourse: async (root, { _id }) => {
    try {
      let db = await new DBConnect().connect();
      await db.collection('courses').deleteOne({ _id: ObjectId(_id) });
      return 'Student was deleted successfully'
    } catch(error) {
      errorHandler(error);
    }
  },
  // Create a student
  createStudent: async (root, { input }) => {
    try {
      let db = await new DBConnect().connect(); // Connect to DB
      let student = await db.collection('students').insertOne(input); // Insert the data to DB

      input._id = student.insertedId;
      // Return the course created
      return await input;
    } catch(error) {
      errorHandler(error);
    }
  },
  // Edit a student
  editStudent: async (root, { _id, input }) => {
    try {
      let db = await new DBConnect().connect(); // Make the connection to DB
      await db.collection('students').updateOne({ _id: ObjectId(_id) }, { $set: input }); // Sent the ID and Input info to update
      let student = await db.collection('students').findOne({ _id: ObjectId(_id) }); // get the student that was updated
      return await student; // Return the student that was updated
    } catch(error) {
      errorHandler(error);
    }
  },
  // Delete a student
  deleteStudent: async (root, { _id }) => {
    try {
      let db = await new DBConnect().connect();
      await db.collection('students').deleteOne({ _id: ObjectId(_id) });
      return 'Student was deleted successfully'
    } catch(error) {
      errorHandler(error);
    }
  },
  // Add a student to a course
  addStudentToCourse: async (root, { courseId, studentId }) => {
    try {
      let db = await new DBConnect().connect(); // Making the DB connection
      let course = await db.collection('courses').findOne({ _id: ObjectId(courseId) }); // Get the course by ID
      let student = await db.collection('students').findOne({ _id: ObjectId(studentId) }); // Get the student by ID
      // Validation if exist student or course
      if (!course || !student) throw new Error('Student or Course don\'t exist ');
      // Making the 'nested type' adding inside the field 'student' the 'studentId'
      await db.collection('courses').updateOne(
        { _id: ObjectId(courseId) }, // With the course ID to make the update
        { $addToSet: {student: ObjectId(studentId)} } // Using '$addToSet' to find the field 'people' to add the 'student' or 'studentId'
      );

      return await 'The student was added successfully'
    } catch(error) {
      errorHandler(error);
    }
  }
};