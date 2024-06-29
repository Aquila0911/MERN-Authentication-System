import React from "react";
import { Navigate } from "react-router-dom";

export default function RegistrationProtection({ children }) {
  const hasRegistered = localStorage.getItem("hasRegistered");

  if (!hasRegistered) {
    return <Navigate to="/register" replace />;
  }

  return children;
}
