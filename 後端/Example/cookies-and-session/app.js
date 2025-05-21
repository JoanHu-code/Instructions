const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("secret"))

app.get("/",(req,res)=>{
  return res.send("This is homepage.")
})

app.get("/setCookie",(req,res)=>{
  //res.cookie("yourCookie","test");
  res.cookie("yourCookie","test",{ signed:true });
  return res.send("Cookie has already setted.")
})

app.get("/seeCookie",(req,res)=>{
  console.log(req.signedCookies)
  return res.send("Get Cookies! ..." + (req.signedCookies.yourCookie))
})
app.listen(3000,()=>{
  console.log("Server running on port 3000....")
})