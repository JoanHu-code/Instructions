const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("secret"))

app.use(
  session({
    secret:"session-example",
    resave: false,
    saveUninitialized: false,
    cookie:{secure:false}, // localhost
  })
)

const checkUser = (req,res,next)=>{
  if (!req.session.isVerified) {
    return res.send("Please log in to the system!");
  } else {
    next();
  }
}

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

app.get("/setSessionData",(req,res)=>{
  req.session.example= 'something not important...'
  return res.send("Setting session data on the server and storing the signed session ID in the browser.")
})

app.get("/getSessionData",(req,res)=>{
  console.log(req.session);
  // connect.sid => session id
  return res.send("Get session data: ",req.session )
})

app.get("/verifyUser",(req,res)=>{
  req.session.isVerified = true;
  return res.send("Thank you for your login!")

})

app.get("/login",checkUser, (req, res) => {
  return res.send("You are already logged in!");
});

app.listen(3000,()=>{
  console.log("Server running on port 3000....")
})