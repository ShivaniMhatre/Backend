import express from 'express'
import { Login, Register } from './Controllers/User.controller.js';
import mongoose from 'mongoose';

const app=express();
app.get("/",function(req,res){
    res.send("working....")
})
// app.get("/login",function(req,res){
//     res.send("Login....")
// })
app.get("/login",Login)

app.get("/register",Register)
// app.get("/register",function(req,res){
//     res.send("Register....")
// })

mongoose.connect("mongodb+srv://shivani:shivani123@cluster0.t5nkzfc.mongodb.net/awdiznode").then(()=>{
    console.log("Connected to DB")
}).catch((error)=>{
console.log("Error While Connecting MongoDB",error)
})

app.listen(9000,()=>{
    console.log("Server Running On Port Number 9000....")
})