const express = require("express");
const app = express();
const mongoose = require("mongoose")

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/demo").then(()=>{
  console.log("connecting is successful...");
}).catch((e)=>{
  console.log(e);
})

app.listen(3000, ()=>{
  console.log("server is listening port 3000");
})