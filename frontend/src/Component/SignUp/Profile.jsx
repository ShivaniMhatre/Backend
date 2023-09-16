import React, { useContext, useEffect, useState } from 'react'
import AuthProtected from '../Common/AuthProtected.js'
import { UserContext } from '../../Context/UserContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import api from '../Appconfig/index.js'
const Profile = () => {
    const [number, setNumber] = useState();
    const [otpNumber, setOtpNumber] = useState();
    const [isNumberVerified, setIsNumberVerified] = useState(false);
    const [isOTPSent, setIsOTPSent] = useState(false);
    const { state } = useContext(UserContext);
    console.log(state?.user?._id,'profile13')

    const sendOTP = async () => {
        // alert('hi')
        const response = await api.post('/send_otp', { userId: state?.user?._id });
        if (response.data.success) {
            setIsOTPSent(true);
            toast.success("Otp has sent to your number, Please verify it.")
        }
    }

    // const verifyOTP = async () => {
    //     const response = await axios.post('http://localhost:9001/verify_otp', { userID: state?.user?._id, OTP })
    //     if (response.data.success) {
    //         setIsOTPSent(false)
    //         setIsNumberVerified(response.data.isNumberVerified)
    //         toast.success("OTP is Verified")
    //     }
    // }

    const handleVerifyOtp = async (e) => {
      
        e.preventDefault();
    
        if (otpNumber) {
          try {
            const response = await api.post('/verify_otp', { userId: state?.user?._id, otpNumber })
    
            if (response.data.success) {
              console.log(response.data);
              setOtpNumber(false);
              setIsNumberVerified(response.data.isNumberVerified);
              toast.success("OTP is verified!");
            }
          } catch (error) {
            console.log(error);
          }
          
        } else {
          toast.error("Please fill the details!");
        }
      };
    

    useEffect(() => {
        async function getNumber() {
            // alert("called fuction")
            try {
                const response = await api.post("/get_number", { userId: state?.user?._id })
                if (response.data.success) {
                    console.log(response.data, "response.data")
                    setNumber(response.data.number)
                    setIsNumberVerified(response.data.isNumberVerified)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (state?.user?._id) {
            getNumber()
        }
    }, [state])

    return (
        <AuthProtected>
            <h1>Your Profile</h1>
            <h3>Complete Your Phone Verification</h3>
            <h4>Your Number : {number}</h4>
            {isNumberVerified ? (<h4>Your Number Verified.</h4> ): (<button onClick={sendOTP}>Verify Your Number</button>)}
            {isOTPSent &&
                (<form onSubmit={handleVerifyOtp}>
                    <input
                      type="text"
                      placeholder="Enter Your OTP"
                      onChange={(e) => setOtpNumber(e.target.value)}
                    />
                    <button type="submit">Verify</button>
                  </form>)
            }
            {/* {isOTPSent &&
               
                    <div>
                        <input type='text' placeholder='Enter Your OTP' onClick={(e) => setOTP(e.target.value)} />
                        <button onClick={verifyOTP}>Submit OTP</button>
                    </div>
               
            } */}
        </AuthProtected>
    )
}

export default Profile