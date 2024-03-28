import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";

export default function Reset() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    // const backendUrl = process.env.REACT_APP_BACKEND_URL;

    async function generateOTP(e) {
        e.preventDefault();

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/reset", {
                email
            })
                .then(res => {
                    if (res.data == "Failed to send OTP") {
                        toast.error("Failed to send OTP");
                    }
                    else if (res.data == "This Email is Not registered") {
                        toast.error("This Email is Not registered");
                    }
                    else if (res.data.msg == "OTP sent successfully") {
                        history("/confirmOTP", { state: { otp: res.data.otp, mail: email } })
                    }
                })
                .catch(e => {
                    toast.error("error while sendin OTP", e);
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="sm:p-40 px-6 py-40 flex items-center justify-center">

            <Toaster />
            <div className="bg-gray-800 border-4 border-orange-800 opacity-[0.8] p-10 items-center justify-center flex flex-col rounded-3xl">
                <h1 className="text-4xl text-center font-bold font-serif p-4">Reset Password</h1>
                <p className="text-sm pb-4">Enter your 4 digit OTP</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input className="bg-[#bdb5b5] p-1 w-full text-center text-black rounded" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <button className="bg-orange-800 py-1 rounded hover:scale-105 duration-300 hover:bg-orange-700 mt-2" onClick={generateOTP}>Send</button>
                </div>
                <p className="text-sm pt-6">Did't receive the OTP? <Link to={'/reset'} className="text-red-900 cursor-pointer hover:scale-115 duration-300 font-bold" onClick={generateOTP}>Re-send OTP</Link></p>
                <p className="text-sm pt-2">Go back to <Link to={'/login'} className="text-red-900 cursor-pointer hover:scale-115 duration-300 font-bold">Login page</Link></p>
                <p className="text-sm pt-2">Don't have an account? <Link to={'/register'} className="text-red-900 cursor-pointer hover:scale-115 duration-300 font-bold">Register here</Link></p>
            </div>
        </div>
    )
}