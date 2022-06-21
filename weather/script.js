const http = require("http");
const fs = require("fs");
var request=require("requests");
const replacedata = (tempval, orgval) =>{
    let temprature = tempval.replace(" {%tempval%}" , orgval.main.temp);
     temprature = temprature.replace(" {%tempmin%}" , orgval.main.temp_min);
     temprature = temprature.replace(" {%tempmax%}" , orgval.main.temp_max);
     temprature = temprature.replace(" {%location%}" , orgval.name);
     temprature = temprature.replace(" {%country%}" , orgval.sys.country);
     return temprature;


}

const homeFile = fs.readFileSync("index.html" , "utf-8");
 const server = http.createServer((req , res)=>{
     if(req.url=="/"){
          request('https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=fd07808abd65128a6276af95a6bb9242')
          .on( "data" , (chunk) => {
              const objdata= JSON.parse(chunk);
              const arrdata = [objdata]
            console.log(arrdata);
            const realtimedata = arrdata.map(val => replacedata(homeFile, val)).join("");
            res.write(realtimedata)
          })
          .on("end", (err) => {
              if (err) return console.log("error" , err);
            //   console.log("end")
            res.end();
          });
        
     }
 });
 server.listen(8080 , "127.0.0.1")