import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { Get_CurrentUser, Login, Register, getnumber, sendOtp, verifiedOTP } from './Controller/User.controller.js';
import { Add_Product, allproduct, deleteyourProduct, getyourProduct, updateyourProduct } from './Controller/Product.controller.js';
import { checkseller, isAdmin, isUserLogged } from './Middlewares/All.Middlewares.js';
import { addComments, addRating, addtocart, addtowishlist, getcartProduct, getwishlistProduct, removecartProduct } from './Controller/Buyers.controller.js';
import { blockProduct, blockUser, getAllBuyers, getAllProduct, getAllSeller, getBlockedProduct, getUnVerifiedProduct, getVerifiedProduct, unblockUser, unblokProduct, verifyProduct } from './Controller/Admin.controller.js';

const app = express();
app.use(express.json())
dotenv.config();
app.use(cors())

app.get("/", (req, res) => {
    res.send("Working")
})

function checkJWT(req, res, next) {
    const fulltoken = req.headers.authorization
    if (fulltoken) {
        try {
            const decodeData = jwt.verify(token, process.env.JWT_SECRET)
            const expTime = decodeData?.exp;
            const currentTimestamp = Math.floor(Date.now() / 1000)
            console.log(expTime, currentTimestamp, "expTime at middleware")
            if (currentTimestamp > expTime) {
                return res.status(404).json({ success: false, message: "Session is over,Please Login Again" })
            }
            next();
        } catch (error) {
            console.log(error, "after error at exp")
            return res.status(500).josn({ success: false, message: 'Token is expired' })
        }
    }
    next();
}

app.post("/register", Register)

app.post("/login", Login)

app.post("/getcurrentuser", Get_CurrentUser)

app.post("/add_product", checkseller, Add_Product)

app.post("/all_products", allproduct)

app.post("/getyourProduct", checkseller, getyourProduct)

app.patch("/updateyourproduct", checkseller, updateyourProduct)

app.delete("/deleteyourproduct", checkseller, deleteyourProduct)

app.post('/get_number', getnumber)
app.post('/send_otp', sendOtp)
app.post('/verify_otp', verifiedOTP)

// BUYERS
app.post("/addtocart", addtocart)
app.get("/getcartProduct", getcartProduct)
app.post("/addtowishlist", addtowishlist)
app.get("/getwishlistProduct", getwishlistProduct)
app.delete("/removecartProduct", removecartProduct)
app.patch("/add_rating", isUserLogged, addRating)
app.patch('/add_comments', isUserLogged, addComments)

// ADMIN
app.patch("/blockuser", isAdmin, blockUser)
app.patch("/unblockuser", isAdmin, unblockUser)
app.patch("/blockproduct", isAdmin, blockProduct)
app.patch("/unblockproduct", isAdmin, unblokProduct)
app.patch("/verifyproduct", isAdmin, verifyProduct)
app.get("/get_all_buyers", isAdmin, getAllBuyers)
app.get("/get_all_sellers", isAdmin, getAllSeller)
app.get("/get_all_product", isAdmin, getAllProduct)
app.get("/get_verified_product", isAdmin, getVerifiedProduct)
app.get("/get_unverified_product", isAdmin, getUnVerifiedProduct)
app.get("/get_blocked_product", isAdmin, getBlockedProduct)






mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB")
}).catch((error) => {
    console.log("Error While Connecting MongoDB", error)
})

app.listen(9001, () => {
    console.log("Listening on Port 9001")
})