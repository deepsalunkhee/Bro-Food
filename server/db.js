const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', false); 

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

    console.log('Connected to the database');

    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

module.exports = connectToDatabase();

