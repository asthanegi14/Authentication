import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Profile() {
    const location = useLocation();
    const address = location.state.address;
    const phone = location.state.phone;
    const site = location.state.site;
    const name = location.state.username;
    const email = location.state.email;

    return (
        <div>
            <Navbar />
            <div className="sm:p-20 px-6 py-20 flex items-center justify-center">
                <div className="bg-gray-800 border-4 border-orange-800 opacity-[0.8] p-10 items-center justify-center flex flex-col rounded-3xl gap-6 text-center">
                    <div>
                        <h1>
                            Hello <b className="text-lg font-mono font-bold">{name}
                            </b> welcome to your Profile Page
                        </h1>
                        {email ?
                            <div className="p-4 text-left justify-between flex flex-col">
                                <div className="flex flex-row justify-between">
                                    <p>Your Username:</p>
                                    <p>{name}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Your Email:</p>
                                    <p>{email}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Your Address:</p>
                                    <p>{address}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Your Site:</p>
                                    <a href={site} className="text-blue-400"> Site link</a>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Your Contact:</p>
                                    <p>{phone}</p>
                                </div>
                            </div>
                            :
                            <Link to="/login" className="p-4 text-red-500 cursor-pointer hover:scale-105 duration-200">You have not logged in yet, please login before proceeding</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}