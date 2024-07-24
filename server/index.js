const express = require("express");
const bodyParser = require('body-parser');
const apartmentRoutes = require('./routes/apartmentRoutes');
const app = express();

const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
// Middleware to check the size of headers
// app.use((req, res, next) => {
//     const headersSize = JSON.stringify(req.headers).length;
//     if (headersSize > 8192) { // Adjust this value as needed
//       return res.status(431).send('Request Header Fields Too Large');
//     }
//     next();
//   });

app.use(express.json());
app.use('/api', apartmentRoutes);

//ROUTES
//Upload new apartment
app.post("/apartments", async(req,res) => {
  try {
    const {landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description} = req.body;
    const newApartment = await pool.query(
      "INSERT INTO apartments (landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description) VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description]
    );
    res.json(newApartment);
  } catch (error) {
    console.error(err.message);
    
  }

});

//get all apartments 
app.get("/apartments", async(req, res) =>{
  try {
    const allApartments = await pool.query("SELECT * FROM apartments")
    res.json(allApartments.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//get an apartment with apartment_id
app.get("/apartments/:id", async(req, res) =>{
  try {
    const {id} = req.params;
    const getApartment = await pool.query("SELECT * FROM apartments WHERE apartment_id = $1", [
      id
    ]);
    res.json(getApartment.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//update an apartment
app.put("/apartments/:id", async(req,res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateApartment = await pool.query(
      "UPDATE  apartments SET description = $1 WHERE apartment_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(err.message);
    
  }

});

//delete an apartment
app.delete("/apartments/:id", async(req, res) =>{
  try {
    const {id} = req.params;
    const deleteApartment = await pool.query("DELETE FROM apartments WHERE apartment_id = $1", [
      id
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});