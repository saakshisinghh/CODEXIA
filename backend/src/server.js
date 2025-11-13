import express from "express";
import { ENV } from "./lib/env.js";


const app = express();

console.log(ENV.PORT);


app.get("/",(req,res) =>{
    res.status(200).json({message : " sucess from backend"});
});

app.listen(ENV.PORT ,()=> 
console.log("SERVER IS RUNNING ON PORT:" , ENV.PORT)
);