const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require('./db');


app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    await mongoDB;

    app.get('/', (req, res) => {
      res.send('Express server');
    });

    app.use('/api', require("./Routes/CreateUser") )
     app.use('/api', require("./Routes/DisplayData") )
    app.use('/api', require("./Routes/OrderData") )

    app.listen(port, () => {
      console.log(`The server is running at port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();