import { Link, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const { isLoggedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
      <div className="w-full min-h-screen flex flex-col">
        <header className="p-4 md:p-5 flex items-center justify-between väribg">
          <div className="text-3xl text-white">
            <h1 className="bruno-ace-sc-regular text-2xl md:text-4xl text-orange-500">G Fit</h1>
          </div>

          <button
              className="md:hidden text-white p-2"
              onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isLoggedIn && (
              <div className="hidden md:flex space-x-5 text-orange-500">
                <Link to="/"
                      className="underline-hover text-white font-semibold bruno-ace-sc-regular text-lg p-2">Home</Link>
                <Link to="/customers"
                      className="underline-hover text-white font-semibold bruno-ace-sc-regular text-lg p-2">Customers</Link>
                <Link to="/workouts"
                      className="underline-hover text-white font-semibold bruno-ace-sc-regular text-lg p-2">Workouts</Link>
                <Link to="/meals"
                      className="underline-hover text-white font-semibold bruno-ace-sc-regular text-lg p-2">Nutrition</Link>
                <button onClick={handleLogout}
                        className="underline-hover-logout text-orange-500 font-semibold bruno-ace-sc-regular text-lg p-2">
                  Log out
                </button>
              </div>
          )}

          {!isLoggedIn && (
              <div className="hidden md:flex space-x-7">
                <Link to="/login" className="text-white bruno-ace-sc-regular text-lg">Login</Link>
                <Link to="/register" className="text-white bruno-ace-sc-regular text-lg">Register</Link>
              </div>
          )}
        </header>

        {mobileMenuOpen && isLoggedIn && (
            <div className="md:hidden väribg p-4">
              <nav className="flex flex-col space-y-3">
                <Link to="/"
                      className="text-white font-semibold bruno-ace-sc-regular text-lg p-2"
                      onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/customers"
                      className="text-white font-semibold bruno-ace-sc-regular text-lg p-2"
                      onClick={() => setMobileMenuOpen(false)}>
                  Customers
                </Link>
                <Link to="/workouts"
                      className="text-white font-semibold bruno-ace-sc-regular text-lg p-2"
                      onClick={() => setMobileMenuOpen(false)}>
                  Workouts
                </Link>
                <Link to="/meals"
                      className="text-white font-semibold bruno-ace-sc-regular text-lg p-2"
                      onClick={() => setMobileMenuOpen(false)}>
                  Nutrition
                </Link>
                <button onClick={handleLogout}
                        className="text-orange-500 font-semibold bruno-ace-sc-regular text-lg p-2 text-left">
                  Log out
                </button>
              </nav>
            </div>
        )}

        {mobileMenuOpen && !isLoggedIn && (
            <div className="md:hidden bg-gray-800 p-4">
              <nav className="flex flex-col space-y-3">
                <Link to="/login"
                      className="text-white bruno-ace-sc-regular text-lg p-2"
                      onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register"
                      className="text-white bruno-ace-sc-regular text-lg p-2"
                      onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </nav>
            </div>
        )}

        <main className="flex-1 flex justify-center pb-4">
          <Outlet />
        </main>
      </div>
  );
}

export default Layout;
