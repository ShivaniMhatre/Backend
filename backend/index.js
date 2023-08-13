import express from 'express'
import { Delete, Find, Login, Register, Update } from './Controllers/User.controller.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './Modals/User.modal.js';

const app=express();
dotenv.config();
app.use(express.json());

app.get("/",function(req,res){
    res.send("working....")
})

// app.get("/login",function(req,res){
//     res.send("Login....")
// })
app.get("/login",Login)

// CREATE
app.post("/register",Register)
// app.get("/register",function(req,res){
//     res.send("Register....")
// })

// READ
app.get("/find",Find)

// UPDATE

app.patch("/update/:id",Update)

app.delete("/delete",Delete)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB")
}).catch((error)=>{
console.log("Error While Connecting MongoDB",error)
})

app.listen(9000,()=>{
    console.log("Server Running On Port Number 9000....")
})