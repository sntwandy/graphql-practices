const DBConnect = require('./mongodb');
const { ObjectId } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  Course: {
    students: async ({ student }) => {
      try {
        let db = await new DBConnect().connect();
        let ids = student ? student.map(id => ObjectId(id)) : [];
        let studentData = ids.length > 0 ? await db.collection('students').find({ _id: { $in: ids } }).toArray() : [];
        return await studentData;
      } catch(error) {
        errorHandler(error);
      };
    }
  }
};