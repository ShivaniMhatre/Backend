import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register } from './Controller/User.controller.js';

const app = express();
dotenv.config();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Working")
})

app.post("/register",Register)
app.post("/login",Login)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB")
}).catch((error)=>{
console.log("Error While Connecting MongoDB",error)
})

app.listen(9001,()=>{
    console.log("Listening on Port 9001")
})