import ProductModal from "../Modals/Product.modal.js"
import UserModal from "../Modals/User.modal.js"

export const blockUser = async (req, res) => {
    try {
        const { userId } = req.body

        const isUserBlocked = await UserModal.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })

        if (isUserBlocked) {
            return res.status(200).json({ success: true, message: "User is Blocked", user: isUserBlocked })
        }
        throw new Error("MongoDB Error")
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const unblockUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const isUserUnBlocked = await UserModal.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
        if (isUserUnBlocked) {
            return res.status(200).json({ success: true, message: "User Unblocked Successfully...", user: isUserUnBlocked })
        }
        throw new Error("MongoDB Error")
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const blockProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const isProductBlock = await ProductModal.findByIdAndUpdate(productId, { isBlocked: true }, { new: true })
        if (isProductBlock) {
            return res.status(200).json({ success: true, message: "Product Blocked Successfully...", product: isProductBlock })
        }
        throw new Error("MongoDB Error")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const unblokProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const isProductBlock = await ProductModal.findByIdAndUpdate(productId, { isBlocked: false }, { new: true })
        if (isProductBlock) {
            return res.status(200).json({ success: true, message: "Product UnBlocked Successfully...", product: isProductBlock })
        }
        throw new Error("MongoDB Error")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const verifyProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const isProductVerified = await ProductModal.findByIdAndUpdate(productId, { isVerify: true }, { new: true })
        if(isProductVerified){
            return res.status(200).json({success:true,message:"Product Is Verified....",product:isProductVerified})
        }
        throw new Error("MongoDB Error")

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getAllBuyers= async(req,res)=>{
    try {
        const buyers = await UserModal.find({role:"Buyer"});
        if (buyers.length) {
            return res.status(200).json({ status: "Success", user: buyers })
        }
        return res.status(404).json({ status: "error", message: "No User Found" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getAllSeller= async(req,res)=>{
    try {
        const sellers = await UserModal.find({role:"Seller"});
        if (sellers.length) {
            return res.status(200).json({ status: "Success", user: sellers })
        }
        return res.status(404).json({ status: "error", message: "No User Found" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}
export const getAllProduct= async(req,res)=>{
    try {
        const products = await ProductModal.find({});
        if (products.length) {
            return res.status(200).json({ status: "Success", product: products })
        }
        return res.status(404).json({ status: "error", message: "No User Found" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getVerifiedProduct=async(req,res)=>{
    try {
        const products = await ProductModal.find({isVerify:true});
        if (products.length) {
            return res.status(200).json({ status: "Success", product: products })
        }
        return res.status(404).json({ status: "error", message: "No User Found" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const getUnVerifiedProduct=async(req,res)=>{
    try {
        const products = await ProductModal.find({isVerify:false});
        if (products.length) {
            return res.status(200).json({ status: "Success", product: products })
        }
        return res.status(404).json({ status: "error", message: "No User Found" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}
export const getBlockedProduct=async(req,res)=>{
    try {
        const products = await ProductModal.find({isBlocked:true});
        if (products.length) {
            return res.status(200).json({ status: "Success", product: products })
        }
        return res.status(404).json({ status: "error", message: "No User Found" })

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}
