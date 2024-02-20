const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const mongodbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.adoxnxs.mongodb.net/?retryWrites=true&w=majority`;

let _db; 

const mongoConnect = async(callback) => {
  try {
    const client = await mongoClient.connect(mongodbURI);
    _db = client.db('Shop');
    console.log("Database Connected successfully.");
    callback();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw "No Database found";
}

module.exports = {
  mongoConnect,
  getDb
};
