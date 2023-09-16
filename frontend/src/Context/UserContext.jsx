import { createContext, useEffect, useReducer } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const UserContext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        // case 'LOGOUT':
        //     localStorage.removeItem("token")
        //     toast.success("Logout Successfull ")
        //     return {
        //         ...state,
        //         user: null
        //     }
        case 'LOGOUT':
            return {...state,user:null}

        default:
            return state
    }
}

const Usercontext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        async function CurrentUserData() {
            var token = JSON.parse(localStorage.getItem("token"))
            if (token) {
                try {
                    const responce = await axios.post("http://localhost:9001/getcurrentuser", { token })
                    console.log(responce.data, "data")
                    if (responce.data.success) {
                        dispatch({
                            type: "LOGIN",
                            payload: responce.data.user
                        })
                    }
                }catch(error){
                    console.log(error)
                }

            }
        }
        CurrentUserData();
    }, [])


    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default Usercontext;