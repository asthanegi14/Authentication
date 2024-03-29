import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email, password
            })
                .then(res => {
                    localStorage.setItem('token', res.data.token);

                    if (res.data.msg == "login successfully") {
                        history("/", { state: { username: res.data.username, email: email } })
                    }
                    else if (res.data == "this email is not registered") {
                        toast.error("This email is not registered");
                    }
                    else if (res.data == "Wrong Password") {
                        toast.error("Wrong Password");
                    }
                    else if (res.data == "Password can not be empty") {
                        toast.error("Password can not be empty");
                    }
                })
                .catch(e => {
                    toast.error("wrong details");
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
                <h1 className="text-4xl text-center font-bold font-serif p-4">Login Page</h1>
                <p className="text-sm pb-4">Enter your username and password</p>
                <form action="POST">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between gap-4">
                            <label htmlFor="username">Email</label>
                            <input type="text" name="username" placeholder="Your Username/Email" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="Your Password" className="px-4 bg-slate-400 placeholder-[#242424] rounded-sm text-[#242424]" onChange={(e) => { setPass(e.target.value) }} />
                        </div>
                        <button className="bg-orange-800 py-1 rounded hover:scale-105 duration-300 hover:bg-orange-700" onClick={submit}>Login </button>
                    </div>
                </form>
                <p className="text-sm pt-6">Don't have an account? <Link to={'/register'} className="text-red-900 cursor-pointer hover:scale-115 duration-300 font-bold">Register here</Link></p>
                <p className="text-sm pt-2">Forget password? <Link to={'/reset'} className="text-red-900 cursor-pointer hover:scale-115 duration-300 font-bold">Reset password</Link></p>
            </div>
        </div>
    )
}