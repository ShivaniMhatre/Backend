import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const SellerProtected = ({ children }) => {
    const { state } = useContext(UserContext)
    const router = useNavigate();

    useEffect(() => {
        if (state?.user?.role != "Seller") {
            router('/')
        }
    }, [state])

    return state?.user?.role == "Seller" ? children : null;
}

export default SellerProtected