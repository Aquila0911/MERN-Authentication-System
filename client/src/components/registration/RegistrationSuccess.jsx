import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  localStorage.removeItem("hasRegistered");

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div>
          <h1 className="mb-3 font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl">
            Registration Successful!
          </h1>
          <p>You will be redirected to the login page in 3 seconds...</p>
          <div className="flex justify-center">
            <div className="animate-spin h-10 w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ transform: "rotateX(180deg)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2a8.001 8.001 0 0015.357 2m0 0H15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
