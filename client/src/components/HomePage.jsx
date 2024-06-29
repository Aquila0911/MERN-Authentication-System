import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mern-stack-icon.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <div className="flex justify-center">
          <img src={logo} className="w-48 h-48 mb-6" alt="Logo" />
        </div>
        <h1 className="mb-8 font-bold text-black text-2xl md:text-3xl lg:text-4xl">
          Welcome to My Application!
        </h1>
        <div className="space-x-2 sm:space-x-4 md:space-x-6 mb-20">
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
