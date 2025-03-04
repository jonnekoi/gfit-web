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
            <header className="p-10 flex items-center justify-between border-b">
                <div className="text-3xl text-white">
                    <h1 className="farsan-regular text-4xl">Logo Here</h1>
                </div>
                {isLoggedIn ? (
                    <>
                        <div className="space-x-5">
                            <Link to="/" className="text-white montserrat-text text-2xl p-2">Home</Link>
                            <Link to="/customers" className="text-white montserrat-text text-2xl p-2">Customers</Link>
                            <Link to="/workouts" className="text-white montserrat-text text-2xl p-2">Workouts</Link>
                            <Link to="/meals" className="text-white montserrat-text text-2xl p-2">Meals</Link>
                            <button onClick={handleLogout} className="text-white font-bold montserrat-text text-2xl p-2">Log out</button>
                        </div>
                    </>
                ) : (
                    <div className="space-x-7">
                        <Link to="/login" className="text-white farsan-regular text-3xl">Login</Link>
                        <Link to="/register" className="text-white farsan-regular text-3xl">Register</Link>
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
