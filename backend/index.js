// backend/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");


dotenv.config(); //load env variables
const app = express();

// Middlewares
app.use(cors()); //allow request from frontend 
app.use(express.json({ limit: "10mb" })); //parse JSON body

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to DevConnect API!");
});

app.use("/api/form", formRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
