import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const { user, logout, loading } = useAuth(); // ✅ Get loading
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (loading) return null; // Or show a spinner if you prefer

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Task Manager</Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden focus:outline-none"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className={`md:flex md:items-center space-y-2 md:space-y-0 md:space-x-6 ${menuOpen ? "block" : "hidden"}`}>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="block hover:underline">Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="block hover:underline">Login</Link>
                            <Link to="/register" className="block hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
