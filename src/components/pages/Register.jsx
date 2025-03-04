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
        <div className="flex flex-col text-center p-5 formBackGroundColor border rounded-2xl w-1/3 mt-10">
            <form onSubmit={(e)=> handleRegister(e, setError, setIsLoggedIn)} className="flex flex-col m-auto justify-center w-2/3">
                <label className="code-text text-white m-2">Name</label>
                <input className="p-2 rounded" type="text" name="name" placeholder="Name" />
                <label className="code-text text-white m-2">Username</label>
                <input className="p-2 rounded" type="text" name="username" placeholder="Username" />
                <label className="code-text text-white m-2">Passoword</label>
                <input className="p-2 rounded" type="password" name="password" placeholder="Password" />
                <label className="code-text text-white m-2">Confirm password</label>
                <input className="p-2 rounded" type="password" name="confirmPassword" placeholder="Confirm password" />
                <button className="border text-white p-2 m-5 rounded code-text hover:bg-white hover:text-black" type="submit">Register</button>
            </form>
            {error && <p className="text-red-600 code-text">{error}</p>}
        </div>
    )
}

export default Register;
