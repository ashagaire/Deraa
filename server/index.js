const express = require("express");
// const bodyParser = require('body-parser');
// const apartmentRoutes = require('./routes/apartmentRoutes');
const app = express();

const cors = require("cors");
const pool = require("./db");
const authorization = require("./middleware/authorization");

//middleware

app.use(cors());
app.use(express.json());


//ROUTES
//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"))

//Upload new apartment
app.post("/apartments", async(req,res) => {
  try {
    const {landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description} = req.body;
    const newApartment = await pool.query(
      "INSERT INTO apartments (landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description) VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [landlord_id, number_of_rooms, size, kitchen_included, bathroom_type, rent, address, description]
    );
    res.json(newApartment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

// get all apartments 
// app.get("/apartments", async(req, res) =>{
//   try {
//     const allApartments = await pool.query("SELECT * FROM apartments")
//     res.json(allApartments.rows);
//   } catch (error) {
//     console.error(err.message);
//   }
// });

//get an apartment with apartment_id
// app.get("/apartments/:id", async(req, res) =>{
//   try {
//     const {id} = req.params;
//     const getApartment = await pool.query("SELECT * FROM apartments WHERE apartment_id = $1", [
//       id
//     ]);
//     res.json(getApartment.rows);
//   } catch (error) {
//     console.error(err.message);
//   }
// });

//search apartments
app.get('/apartments/search', async (req, res) => {
  try {
    const {
      number_of_rooms,
      size,
      kitchen_included,
      bathroom_type,
      rent,
      address,
    } = req.query;

    const searchQuery = `
      SELECT * FROM apartments
      WHERE ($1::text IS NULL OR number_of_rooms::text ILIKE $1)
      AND ($2::text IS NULL OR size::text ILIKE $2)
      AND ($3::boolean IS NULL OR kitchen_included = $3)
      AND ($4::text IS NULL OR bathroom_type ILIKE $4)
      AND ($5::text IS NULL OR rent::text ILIKE $5)
      AND ($6::text IS NULL OR address ILIKE $6)
    `;
    const values = [
      number_of_rooms ? `%${number_of_rooms}%` : null,
      size ? `%${size}%` : null,
      kitchen_included === 'true' ? true : null,
      bathroom_type ? `%${bathroom_type}%` : null,
      rent ? `%${rent}%` : null,
      address ? `%${address}%` : null,
    ];
    console.log("Query Text:", searchQuery);
    console.log("Query Values:", values);

    const result = await pool.query(searchQuery, values);

    res.json(result.rows);
    
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).send('Server error');
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