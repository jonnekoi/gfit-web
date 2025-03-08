import {Link, Outlet} from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import {useEffect, useState} from "react";

const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
}

const Layout = () => {
    const { isLoggedIn } = useAuth();
    const [username, setUsername] = useState('');

    const getUsername = () => {
        const user = sessionStorage.getItem('username');
        setUsername(user);
    }

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <>
            <header className="p-10 flex items-center väribg justify-between ">
                <div className="text-3xl text-white">
                    <h1 className="bruno-ace-sc-regular text-4xl text-orange-500">G Fit</h1>
                </div>
                {isLoggedIn ? (
                    <>
                        <div className="space-x-5 text-orange-500">
                            <Link to="/"
                                  className="underline-hover text-white font-semibold michroma-regular text-1xl p-2">Home</Link>
                            <Link to="/customers"
                                  className="underline-hover text-white font-semibold michroma-regular text-1xl p-2">Customers</Link>
                            <Link to="/workouts"
                                  className="underline-hover text-white font-semibold michroma-regular text-1xl p-2">Workouts</Link>
                            <Link to="/meals"
                                  className="underline-hover text-white font-semibold michroma-regular text-1xl p-2">Meals</Link>
                            <button onClick={handleLogout}
                                    className="underline-hover-logout text-orange-500 font-semibold michroma-regular text-xl p-2">Log
                                out
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-x-7">
                        <Link to="/login" className="text-white michroma-regular text-xl">Login</Link>
                        <Link to="/register" className="text-white michroma-regular text-xl">Register</Link>
                    </div>
                )}
            </header>
            <div className="flex justify-center">
                <Outlet/>
            </div>
        </>
    )
}


export default Layout;
