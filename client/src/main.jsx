import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import Layout from "./components/Layout";
import DetailsPage from "./components/DetailsPage";
import LoginPage from "./components/login/LoginPage.jsx";
import RegistrationPage from "./components/registration/RegistrationPage.jsx";
import RegistrationSuccess from "./components/registration/RegistrationSuccess.jsx";
import LoginProtection from "./components/protectedRoutes/LoginProtection.jsx";
import RegistrationProtection from "./components/protectedRoutes/RegisterProtection.jsx";
import { AuthProvider } from "./components/AuthService.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout>
          <App />
        </Layout>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Layout>
          <LoginPage />
        </Layout>
      </AuthProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthProvider>
        <Layout>
          <RegistrationPage />
        </Layout>
      </AuthProvider>
    ),
  },
  {
    path: "/register-success",
    element: (
      <AuthProvider>
        <RegistrationProtection>
          <Layout>
            <RegistrationSuccess />
          </Layout>
        </RegistrationProtection>
      </AuthProvider>
    ),
  },
  {
    path: "/details-page",
    element: (
      <AuthProvider>
        <LoginProtection>
          <Layout>
            <DetailsPage />
          </Layout>
        </LoginProtection>
      </AuthProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
