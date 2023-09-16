import ProductModal from "../Modals/Product.modal.js";
import jwt from 'jsonwebtoken';

export const Add_Product = async (req, res) => {
    try {
        const { name, price, image, category } = req.body.productData;
        const { token } = req.body
        if (!name || !price || !image || !category || !token) return res.status(404).json({ success: false, message: "All fields are mandtory.." })

        const decodeData = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeData) {
            return res.status(404).json({ success: false, message: "Token not valid..." })
        }
        const userId = decodeData.userId


        const product = new ProductModal({
            name,
            price: parseInt(price),
            image,
            category,
            userId: userId
        });
        await product.save();

        return res.status(201).json({ success: true, message: "Product Added Succesfully" })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const allproduct = async (req, res) => {
    try {
        const products = await ProductModal.find({});
        if (products.length) {
            return res.status(200).json({ success: true, product: products })
        }
        return res.status(404).json({ success: false, message: "No Product Found" })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const getyourProduct = async (req, res) => {
    try {
        const { token } = req.body;
        const decodeData = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeData) {
            return res.status(404).json({ success: false, message: "Token Not Valid..." })
        }

        const userId = decodeData.userId;

        const yourProduct = await ProductModal.find({ userId: userId })
        if (yourProduct.length) {
            return res.status(200).json({ success: true, products: yourProduct })
        }
        return res.status(404).json({ success: false, message: "No Product Found" })


    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const updateyourProduct = async (req, res) => {
    try {
        const { productId, name, price, image, category, token } = req.body;

        if (!token) return res.status(404).json({ status: "error", message: "Token Is Required" });

        const decodeData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodeData) {
            return res.status(404).json({ status: "error", message: "Token Not Valid" })
        }

        const userId = decodeData.userId;
        const updateData = await ProductModal.findOneAndUpdate({ _id: productId, userId: userId }, { name, price, image, category }, { new: true })
        if (updateData) {
            return res.status(200).json({ status: "Success", message: "Product Updated", product: updateData })
        }
        return res.status(404).json({ status: "error", message: "You are trying to update product which is not yours..." })
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}

export const deleteyourProduct = async (req, res) => {
    try {
        const { token, productId } = req.body;
        if (!productId) return res.status(404).json({ status: "error", message: "Product ID is required" })

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodeData?.userId;

        const isDeleted = await ProductModal.findOneAndDelete({ _id: productId, userId: userId });
        if (isDeleted) {
            return res.status(200).json({ success: true, message: "Product Is Deleted ......" })
        }
        throw new Error("MongoDb Error")

    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message })
    }
}