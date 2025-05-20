const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/",(req,res)=>{
  return res.send("This is homepage.")
})

app.get("/setCookie",(req,res)=>{
  res.cookie("yourCookie","test");
  return res.send("Cookie has already setted.")
})

app.get("/seeCookie",(req,res)=>{
  return res.send("Get Cookies! ..." + (req.cookies.yourCookie))
})
app.listen(3000,()=>{
  console.log("Server running on port 3000....")
})