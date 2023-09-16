import jwt from 'jsonwebtoken';
import UserModal from '../Modals/User.modal.js';
import ProductModal from '../Modals/Product.modal.js';

export const singleProduct = async(req, res) => {
    try {
        const { singleProductId } = req.body;
        if(!singleProductId){
            return res.json({
                success:false,
                message:"Id is Required"
            })
        }
        const product=await ProductModal.findById({singleProductId});
        if(product){
            return res.json({
                success:true,
                singleProductData:product
            })
        }
        return res.json({
            success:false,
            message:"Product Not found"
        })
    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const addtocart = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!token || !productId) return res.status(404).json({ status: "error", message: "All Fields Are Mandatory...." })
        const decodeData = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodeData?.userId;

        const user = await UserModal.findById(userId);

        user?.cart.push(productId)
        await user.save();

        return res.status(200).json({ success: true, user: user })


    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getcartProduct = async (req, res) => {
    try {
        const { token } = req.body;
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodeData?.userId;

        const user = await UserModal.findById(userId);
        if (user) {
            let finalData = [];
            for (let i = 0; i < user.cart.length; i++) {
                const product = await ProductModal.findById(user.cart[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, product: finalData })
        }
        throw new Error("MongoDb Error")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const addtowishlist = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodeData?.userId;
        const user = await UserModal.findById(userId)
        user?.wishlist.push(productId)
        await user.save();

        return res.status(200).json({ success: true, user: user })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getwishlistProduct = async (req, res) => {
    try {
        const { token } = req.body;
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodeData?.userId;
        const user = await UserModal.findById(userId)
        if (user) {
            let finalData = [];
            for (let i = 0; i < user.wishlist.length; i++) {
                const product = await ProductModal.findById(user.wishlist[i])
                if (product) {
                    finalData.push(product)
                }
            }
            return res.status(200).json({ success: true, wishlist: finalData })
        }

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const removecartProduct = async (req, res) => {
    try {
        const { token, productId } = req.body;
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodeData?.userId;

        const user = await UserModal.findById(userId);

        const cart = user.cart
        const removeItem = cart.indexOf(productId)
        cart.splice(removeItem, 1)
        await user.save();
        return res.status(200).json({ status: "success", message: "deleteed" })
    }
    catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const addRating = async (req, res) => {
    try {
        const { productId, rating } = req.body;
        const updateProductWithRaing = await ProductModal.findByIdAndUpdate(productId, { $push: { ratings: rating } }, { new: true })

        if (updateProductWithRaing) {
            return res.status(200).json({ success: true, message: "Rating Added", product: updateProductWithRaing })
        }
        throw new Error("MongoDB Error")
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const addComments = async (req, res) => {
    try {
        const { productId, comments, token } = req.body;

        const decodeData = jwt.verify(token, process.env.JWT_SECRET)

        const userId = decodeData.userId
        const user = await UserModal.findById(userId)
        // console.log(user, "-user")

        const updateProductWithComment = await ProductModal.findByIdAndUpdate(productId, { $push: { comments: { comments: comments, Name: user.name } } }, { new: true })

        if (updateProductWithComment) {
            return res.status(200).json({ success: true, message: "Rating Added", product: updateProductWithComment })
        }
        // throw new Error("MongoDB Error")
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

