import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";

const url = 'http://127.0.0.1:3000/v1';

const handleRegister = async (e, setError, setIsLoggedIn) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    const user = {
        name,
        username,
        password
    }

    const response = await fetch(url + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    console.log(data);

    if (data.status === 400) {
        setError('Username already exists');
        return;
    }

    if (data.status === 200) {
        setIsLoggedIn(true);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', username);
        window.location.href = '/';
    }
}

const Register = () => {
    const { setIsLoggedIn } = useAuth();
    const [error, setError] = useState('');

    return (
        <div className="flex flex-col h-1/3 text-center p-6 bg-gray-900/40 border border-orange-500/50 rounded-2xl w-1/3 mt-10 shadow-lg">
            <form onSubmit={(e)=> handleRegister(e, setError, setIsLoggedIn)} className="flex flex-col m-auto justify-center w-2/3">
                <label className="montserrat-text text-gray-300 text-left ml-1 mb-1">Name</label>
                <input className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 mb-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" type="text" name="name" placeholder="Name" />
                <label className="montserrat-text text-gray-300 text-left ml-1 mb-1">Username</label>
                <input className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 mb-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" type="text" name="username" placeholder="Username" />
                <label className="montserrat-text text-gray-300 text-left ml-1 mb-1">Passoword</label>
                <input className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 mb-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" type="password" name="password" placeholder="Password" />
                <label className="montserrat-text text-gray-300 text-left ml-1 mb-1">Confirm password</label>
                <input className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 mb-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" type="password" name="confirmPassword" placeholder="Confirm password" />
                <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3 px-6 rounded-lg montserrat-text hover:cursor-pointer hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-md" type="submit">Register</button>
            </form>
            {error && <p className="text-red-600 montserrat-text">{error}</p>}
        </div>
    )
}

export default Register;
