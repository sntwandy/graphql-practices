const { MongoClient, ObjectId } = require('mongodb');
const  { config } = require('../config');

// ENV Variable from config
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;

// Mongo URI
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}:${config.port}/${DB_NAME}?retryWrites=true&w=majority`;

// Connection to Mongo
class MongoLib {

  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true } );
    this.dbName = DB_NAME;
  };

  connect() {
    if(!MongoLib.connection) {
      MongoLib.connection = new Promise( (resolve, reject) => {
        this.client.connect( err => {
          if(err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        } );
      });
    }
    return MongoLib.connection;
  };

};

module.exports = MongoLib;