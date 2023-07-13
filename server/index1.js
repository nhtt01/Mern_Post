const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const connectDB = async (req,res)=>{
    await mongoose.connect('')
}
app.listen(PORT,()=>{
    console.log("Server running ",PORT);
})