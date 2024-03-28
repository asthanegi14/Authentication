import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function Register() {
    const [username, setName] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCPass] = useState("");
    const [mail, setMail] = useState("");
    const [pNo, setPNo] = useState("");
    const [address, setAddress] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const history = useNavigate();

    async function submit(e) {
        e.preventDefault();

        try {
            if (!(pass === cpass)) {
                toast.error("password and re entered passwords dosn't match");
            }
            else {
                console.log(`Port = ${process.env.REACT_APP_BACKEND_URL} + /register`);
                await axios.post(process.env.REACT_APP_BACKEND_URL + "/register", {
                    email: mail,
                    username: username,
                    password: pass,
                    phone: pNo,
                    address: address,
                    site: portfolio
                })
                    .then(res => {
                        if (res.data == "email already exist") {
                            toast.error("User already exists");
                        }
                        else if (res.data == "Username already exist, please try other username.") {
                            toast.error("Username already exist, please try other username.");
                        }
                        else if (res.data == "registered successfully") {
                            toast.success("You Have registered successfully");
                            history("/");
                        }
                    })
                    .catch(e => {
                        toast.error("wrong details", e);
                    })
            }
        }
        catch {
            console.log(e);
        }
    }
    return (
        <div className="sm:p-40 px-6 py-40 flex items-center justify-center">

            <Toaster />
            <div className="bg-gray-800 border-4 border-orange-800 opacity-[0.8] p-10 items-center justify-center flex flex-col rounded-3xl">
                <h1 className="text-4xl text-center font-bold font-serif p-4">Registration Page</h1>
                <p className="text-sm pb-4">Register yourself before log in</p>
                <form action="POST">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between gap-4">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="Enter your Username" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Enter your Email" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setMail(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Enter your Password" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setPass(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="cPassword">Confirm Password</label>
                            <input type="password" name="cPassword" placeholder="Confirm your Password" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setCPass(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="password">Phone Number</label>
                            <input type="text" name="password" placeholder="Enter your Phone Number" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setPNo(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="password">Address</label>
                            <input type="text" name="password" placeholder="Enter your Address" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setAddress(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="password">Portfolio</label>
                            <input type="text" name="password" placeholder="Enter your Portfolio Link" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setPortfolio(e.target.value) }} />
                        </div>
                        <button className="bg-orange-800 py-1 rounded hover:scale-105 duration-300 hover:bg-orange-700" onClick={submit}>Register Now</button>
                    </div>
                </form>
                <p className="text-sm p-6">Already have an account? <Link to={'/'} className="text-red-900 cursor-pointer hover:scale-115 duration-300 font-bold">Login here</Link></p>
            </div>
        </div>
    )
}