const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', false);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
    console.log('Connected to the database');

    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      
      const foodCatagory = await mongoose.connection.db.collection("foodCatagory");
      foodCatagory.find({}).toArray(function (err, catData) {
        if (err) {
          console.log(err);
          return;
        }
        
        global.food_items = data;
        global.foodCatagory = catData;
      });
    });

    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

module.exports = connectToDatabase();
