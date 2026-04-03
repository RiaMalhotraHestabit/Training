import express from "express";

const app=express();

app.get("/",(req,res)=>{
    res.send("Week-5 Day-1 Docker App Running");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})