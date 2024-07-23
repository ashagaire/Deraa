const express = require("express");
const bodyParser = require('body-parser');
const apartmentRoutes = require('./routes/apartmentRoutes');
const app = express();

// const cors = require("cors");
const pool = require("./db");


//middleware
// app.use(cors());
// Middleware to check the size of headers
app.use((req, res, next) => {
    const headersSize = JSON.stringify(req.headers).length;
    if (headersSize > 8192) { // Adjust this value as needed
      return res.status(431).send('Request Header Fields Too Large');
    }
    next();
  });

app.use(bodyParser.json());
app.use('/api', apartmentRoutes);

//routes

//create a user table

//get all user 

//get a user

//update a user

//delete a user


app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});