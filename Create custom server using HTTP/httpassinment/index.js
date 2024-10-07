const http = require("http");
const fs = require ("fs");

const server = http.createServer((request, response) => {
  if (request.url === "/home") {
    response.end("Home page");
  } 
  else if (request.url === "/about") {
    response.end("About page");
  } 
  else if (request.url === "/getproductdata") {
    fs.readFile("db.json","utf-8",(err,data)=>{
      if(err){
        console.log(err)
      }else{
        const dataa = JSON.parse(data)
        response.end(JSON.stringify(dataa.products))
      }
    })
  } 
  else if (request.url == "/user"){
    fs.readFile("db.json","utf-8",(err,data)=>{
      if(err){
        console.log(err)
      }else{
        const dataa=JSON.parse(data)
        response.end(JSON.stringify(dataa.user))
      }
    })
  }
});
server.listen(4500, () => {
  console.log("server is running on port 4500");
});