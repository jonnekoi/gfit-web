import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

const Layout = lazy(() => import("./components/pages/Layout.jsx"));
const Home = lazy(() => import("./components/pages/Home.jsx"));
const Profile = lazy(() => import("./components/pages/Profile.jsx"));
const Customers = lazy(() => import("./components/pages/Customers.jsx"));
const Workouts = lazy(() => import("./components/pages/Workouts.jsx"));
const Meals = lazy(() => import("./components/pages/Meals.jsx"));
const Login = lazy(() => import("./components/pages/Login.jsx"));
const Register = lazy(() => import("./components/pages/Register.jsx"));
const ClientDetails = lazy(() => import("./components/customerComponents/clientPage/ClientDetails.jsx"));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={<div></div>}>
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
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;
