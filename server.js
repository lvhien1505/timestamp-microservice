const express =require("express");
const env=require("dotenv");

env.config()

const app=express();


const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log("Server is running at port ",PORT);
})

