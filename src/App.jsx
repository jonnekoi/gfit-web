import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/pages/Layout.jsx";
import Home from "./components/pages/Home.jsx";
import Profile from "./components/pages/Profile.jsx";
import Customers from "./components/pages/Customers.jsx";
import Workouts from "./components/pages/Workouts.jsx";
import Meals from "./components/pages/Meals.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import ClientDetails from "./components/customerComponents/clientPage/ClientDetails.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="workouts" element={<Workouts />} />
                        <Route path="meals" element={<Meals />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="/clients/:clientId" element={<ClientDetails />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
