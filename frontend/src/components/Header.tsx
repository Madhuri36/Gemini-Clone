import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaCog } from "react-icons/fa";
import { useTheme } from "../Context/ThemeProvider";
import { userAuth } from "../Context/AuthContext";
import ThemeSettings from "./ThemeSettings";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { theme, setTheme } = useTheme();
    const { isLoggedIn, logout } = userAuth() || {};
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const iconColor = theme === "dark" ? "text-white" : "text-black";

    return (
        <header
            className="sticky top-0 z-50 px-4 py-4 shadow-xl backdrop-blur-lg hide-scrollbar"
            style={{ backgroundColor: "var(--bg-header)" }}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <span
                        onClick={() => navigate(isLoggedIn ? "/chat" : "/")}
                        className="cursor-pointer bg-gradient-to-r bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
                        }}
                    >
                        AI ChatBot
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full"
                        style={{
                            color: "var(--text-accent)",
                            border: "1px solid var(--border-accent)",
                        }}
                    >
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 rounded-full"
                            style={{
                                color: "var(--text-accent)",
                                border: "1px solid var(--border-accent)",
                            }}
                        >
                            <FaCog />
                        </button>
                        {showSettings && (
                            <div className="absolute right-0 mt-2 w-64 z-50">
                                <ThemeSettings />
                            </div>
                        )}
                    </div>

                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate("/chat")}
                                className="px-4 py-2 rounded-md border text-sm font-semibold"
                                style={{
                                    color: "var(--text-accent)",
                                    borderColor: "var(--border-accent)",
                                }}
                            >
                                Go to Chat
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md text-sm font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                    backgroundImage: "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 rounded-md border text-sm font-semibold"
                                style={{
                                    color: "var(--text-accent)",
                                    borderColor: "var(--border-accent)",
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="px-4 py-2 rounded-md text-sm font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                    backgroundImage: "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
                                }}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${iconColor}`}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-3">
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 border rounded-md"
                        style={{
                            color: "var(--text-accent)",
                            borderColor: "var(--border-accent)",
                        }}
                    >
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </button>

                    <div
                        className="border rounded-md p-2"
                        style={{ borderColor: "var(--border-accent)" }}
                    >
                        <ThemeSettings />
                    </div>

                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate("/chat")}
                                className="px-4 py-2 rounded-md border"
                                style={{
                                    color: "var(--text-accent)",
                                    borderColor: "var(--border-accent)",
                                }}
                            >
                                Go to Chat
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md"
                                style={{
                                    color: "var(--text-primary)",
                                    backgroundImage: "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 border rounded-md"
                                style={{
                                    color: "var(--text-accent)",
                                    borderColor: "var(--border-accent)",
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="px-4 py-2 rounded-md"
                                style={{
                                    color: "var(--text-primary)",
                                    backgroundImage: "linear-gradient(to right, var(--gradient-from), var(--gradient-to))",
                                }}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
