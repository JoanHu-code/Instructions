const http = require("http");
const fs = require("fs");
//request object, response object
const server = http.createServer((req,res)=>{
  if(req.url == '/'){
    res.write("Welcome to my website!")  
    res.end()  
  }else if(req.url == '/about'){
    res.write("This is about page!")
    res.end()
  }else if(req.url == '/myFile'){
     fs.readFile("myFile.html",(e,data)=>{
      if(e){
        console.log(e)
        res.write("fail!")
      }else{
        res.write(data)
      }
        res.end()
     })
  }else{
     res.write("404")
  }

}); //callback function with 2 parameters

server.listen(3000,()=>{
  console.log("The serve is running on port 3000")
})