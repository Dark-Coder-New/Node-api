// import express from "express";
// import mongoose from "mongoose";

// import "./models/user.js"; // load
// import authRouter from "./routes/auth.js";
const express = require("express");
const mongoose = require("mongoose");
require("./models/user.js"); // load
const authRouter = require("./routes/auth.js");

const cors = require("cors");

const app = express();
const PORT = 5000;


// Database connection: // abhi123// WMPC7NkXiMYfWKe2
//127.0.0.1:27017

mongoose.connect("mongodb://localhost:27017/xyz")
mongoose.connection.on("connected", () => {console.log("Connected to database")})
mongoose.connection.on("error", () => {console.log("Error connecting to database")})

// Middleware: 
app.use(cors());
app.use(express.json()) 
app.use("/api/auth", authRouter);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})