import {useAuth} from "../../context/AuthContext.jsx";
import ErrorMessage from "../customerComponents/clientPage/addWorkoutToClientComponents/ErrorMessage.jsx";
import {useState} from "react";

const url = 'http://127.0.0.1:3000/v1';

const Login = () => {
    const { setIsLoggedIn } = useAuth();
    const [errortext, setErrortext] = useState('');

    const handleLogin = async (event, setIsLoggedIn) => {
        event.preventDefault();
        const formdata = new FormData(event.target);
        const data = Object.fromEntries(formdata);

        const fetchOption = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url + '/users/login', fetchOption);
            const result = await response.json();
            if (response.status === 200) {
                setIsLoggedIn(true);
                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('username', data.username);
                setErrortext('');
                window.location.href = '/';
            } else {
                setErrortext(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex flex-col text-center p-6 bg-gray-900/40 border border-orange-500/50 rounded-2xl w-1/3 mt-10 shadow-lg">
            <form onSubmit={(e) => handleLogin(e, setIsLoggedIn)} className="flex flex-col m-auto justify-center w-full max-w-md">
                <label className="montserrat-text text-gray-300 text-left ml-1 mb-1">Username</label>
                <input
                    className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 mb-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                />

                <label className="montserrat-text text-gray-300 text-left ml-1 mb-1">Password</label>
                <input
                    className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 mb-6 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                />

                <button
                    className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3 px-6 rounded-lg montserrat-text hover:cursor-pointer hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-md"
                    type="submit"
                >
                    Login
                </button>
            </form>
            {errortext && <ErrorMessage message={errortext} />}
        </div>
    )
}

export default Login;
