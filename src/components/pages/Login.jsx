import {useAuth} from "../../context/AuthContext.jsx";

const url = 'http://127.0.0.1:3000/v1';

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
            window.location.href = '/';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const Login = () => {
    const { setIsLoggedIn } = useAuth();

    return (
        <div className="flex flex-col text-center p-5 border rounded-2xl w-1/3 mt-10">
            <form onSubmit={(e) => handleLogin(e, setIsLoggedIn)} className="flex flex-col m-auto justify-center w-2/3">
                <label className="code-text text-white m-2">Username</label>
                <input className="p-2 rounded" type="text" name="username" placeholder="Username" />
                <label className="code-text text-white m-2">Passoword</label>
                <input className="p-2 rounded" type="password" name="password" placeholder="Password" />
                <button className="border text-white p-2 m-5 rounded code-text hover:bg-white hover:text-black" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
