import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/login", { username, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setIsLoggedIn(true);
      return { success: true, message: response.data.message };
    } catch (error) {
      setIsLoggedIn(false);
      return { success: false, message: error.response.data.message };
    }
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const authService = {
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authService }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
