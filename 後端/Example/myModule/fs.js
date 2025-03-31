const fs = require("fs");
fs.readFile("myFile.txt","utf-8",(e,data)=>{
  if(e) throw e;
  console.log(data);
})