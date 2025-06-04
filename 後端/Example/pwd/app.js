require('dotenv').config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const Student = require("./models/student");
const bcrypt = require("bcrypt");
const saltRounds = 12; // 8,10,12,14

const app = express();

mongoose.connect("mongodb://localhost:27017/demo").then(()=>{
  console.log("connecting is successful...");
}).catch((e) => {
  console.log(e);
});

app.use(
  session({
    secret:"process.env.MYSESSIONSECRETKEY",
    resave: false,
    saveUninitialized: false,
    cookie:{secure:false}, // localhost
  })
)

app.use(express.json());

app.use(express.urlencoded({extended:true}))

const verifyUser = (req,res,next) =>{
  if(req.session.isVerified){
    next();
  }else{
    return res.send("Please sign in to continue.");
  }
}

app.get("/students", async (req, res) => {
  try {
    let foundStudent = await Student.find({}); // ✅ 等待查詢完成
    return res.send(foundStudent);
  } catch (e) {
    return res.status(500).send({ error: "Failed to fetch students", detail: e });
  }
});

app.post("/students",async (req,res)=>{
  try{
    let {username,password} = req.body;
    let hashValue = await bcrypt.hash(password, saltRounds);
    const newStudent = new Student({
      username,
      password: hashValue,
    });
    let saveStudent = await newStudent.save();
    return res.send({message:"Adding successful:",saveStudent});
  }catch (e) {
    console.error("Error while saving student:", e);
    return res.status(400).send({ error: e.message, details: e.errors });
  }

})

app.post("/students/login",async(req,res)=>{
  try{
    let {username,password} = req.body;
    let foundStudent = await Student.findOne({username}); // ✅ 等待查詢完成
    console.log(foundStudent)
    if(!foundStudent){
      return res.send("No user found with the provided email address.");
    }else{
      let result = await bcrypt.compare(password,foundStudent.password);
      if(result){
        req.session.isVerified = true;
        return res.send("login success!")
      }else{
        return res.send("login fail!")
      }
    }
    }catch (e) {
      console.error("Error while saving student:", e);
      return res.status(400).send({ error: e.message, details: e.errors });
    }
})

app.get("/students/logout",(req,res)=>{
  req.session.isVerified = false;
  return res.send("You have already logged out.");
})

app.get("/sercet",verifyUser,(req,res)=>{
  return res.send("My secret is ...")
})

app.listen(3000,()=>{
  console.log("Server running on port 3000....")
})