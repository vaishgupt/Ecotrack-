const express = require("express");
const authRoutes = require("./routes/authRoutes");
const footprintRoutes = require("./routes/FootprintRoutes");
const dotenv= require("dotenv");
const connectDB= require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app= express();

const PORT=5000;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Server is running");
})

app.use("/",authRoutes);
app.use("/api",footprintRoutes);

app.listen(PORT,()=>{
  console.log(`Server running at PORT ${PORT}`);
})