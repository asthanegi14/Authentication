import ProfiePic from "../assets/profile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
    const location = useLocation();
    const history = useNavigate();
    const name = location.state ? location.state.username : null;
    const email = location.state ? location.state.email : null;
    // const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem("token");

    async function profile(e) {
        e.preventDefault();

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/profile", {
                email
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.data == "Not signed in yet") {
                        history("/profile", { state: { msg: "You Have not signed it yet" } });
                    }
                    else if (res.data.msg == "logged in") {
                        history("/profile", { state: { email: email, username: name, address: res.data.content.address, site: res.data.content.site, phone: res.data.content.phone } })
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-row justify-between p-6">
            <h1 className="text-2xl font-bold">AUTHENTICATION</h1>

            <div className="flex flex-row gap-4">
                <img src={ProfiePic} alt="profile" className="w-6 cursor-pointer hover:scale-110 duration-200" onClick={profile} />
                {location.state ?
                    <Link to='/' className="bg-orange-800 p-2 rounded hover:scale-110 duration-200">Log Out</Link>
                    :
                    <div className="flex flex-row gap-x-4">
                        <Link to='/login' className="bg-orange-800 p-2 rounded hover:scale-110 duration-200">
                            Login
                        </Link>
                        <Link to="/register" className="text-orange-200 bg-slate-500 p-2 rounded hover:scale-110 duration-200">
                            Sign In
                        </Link>

                    </div>
                }
            </div>
        </div>
    )
}