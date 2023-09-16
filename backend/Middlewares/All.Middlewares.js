import jwt from "jsonwebtoken";
import UserModal from "../Modals/User.modal.js";

export const checkseller = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ status: "error", message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const user = await UserModal.findById(userId);

        if (!user || user?.role != "Seller") {
            return res.status(404).json({ message: "User not valid to add product from middleware.", status: "error" })
        }

        next();

    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error" })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: 'Token Is Required!!!' })

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodeData) {
            return res.status(404).json({ status: "error", message: 'Token Not Valid!!!!' })
        }

        const userId = decodeData.userId;
        const user = await UserModal.findById(userId)
        if (!user || user?.role != "Admin") {
            return res.status(404).json({ status: 'error', message: "Your are not An ADMIN!!!!" })
        }
        next();

    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error" })
    }
}

export const isUserLogged = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ status: "error", message: 'Token Is Required!!!' })

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodeData) {
            return res.status(404).json({ status: "error", message: 'Token Not Valid!!!!' })
        }

        const userId = decodeData.userId;
        const user = await UserModal.findById(userId)
        if (!user) {
            return res.status(404).json({ status: 'error', message: "Your are not Login Please Login first" })
        }
        next();

    } catch (error) {
        return res.status(500).json({ error: error.message, status: "error" })
    }
}