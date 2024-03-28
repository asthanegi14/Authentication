import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const name = location.state ? location.state.username : "Dear User";

    return (
        <div>
            <Navbar />
            <div className="sm:p-40 px-6 py-40 flex items-center justify-center">
                <div className="bg-gray-800 border-4 border-orange-800 opacity-[0.8] p-10 items-center justify-center flex flex-col rounded-3xl gap-6 text-center">
                    <div>
                        <h1>
                            Hello <b className="text-lg font-mono font-bold">{name}
                            </b> welcome to your Home Page
                        </h1>
                        {!location.state ?
                            <Link to="./login" className="m-4 text-red-500">Login Before proceeding</Link>
                            :
                            <p className="p-4 text-green-600 font-bold">You have signed in sucessfully</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}