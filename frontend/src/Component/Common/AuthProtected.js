import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
    const { state } = useContext(UserContext)
    const router = useNavigate();

    useEffect(() => {
        
        if (!state?.user?.name) {
            router('/login')
        }
    }, [state])

    return state?.user?.name ? children : null;
}

export default AuthProtected