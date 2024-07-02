import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthService";
// import { jwtDecode } from "jwt-decode";

export default function DetailsPage() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  // Function to make API requests
  const makeRequest = (url, options) => {
    return axiosInstance({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  axiosInstance.interceptors.response.use(
    (response) => response, // If response successful
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark this request as retried
        try {
          const response = await axiosInstance.post("/api/refresh-token", {
            refreshToken,
          });
          accessToken = response.data.accessToken;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest); // Retry the original request with new token
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For other errors, just pass them along
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest("/api/user-details", {
          method: "POST",
        });
        console.log("User details acquired from server!");
        setUserDetails(response.data.user.userDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  // Function to delete the user
  const deleteUser = async () => {
    setLoading(true);
    try {
      const userId = userDetails._id;
      const response = await axiosInstance.delete(`/api/delete-user/${userId}`);
      console.log("User deleted successfully: ", response.data);
      auth.authService.logout();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading)
    return (
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
    );

  const excludedKeys = ["password", "username", "_id"];

  function capitalizeKeys(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="flex justify-center my-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-header text-shadow">
          Welcome, {userDetails.name}
        </h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-10 text-xs sm:text-sm md:py-2 md:px-4 md:text-base"
          onClick={() => {
            console.log("Deleting user...");
            deleteUser();
          }}
        >
          Delete User
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <div className="bg-white rounded-lg w-[80%] h-[70vh] p-6 text-2xl shadow-neon-green">
          <h2 className="font-header mb-6">Your Details:</h2>
          <div className="grid grid-cols-2 gap-4 ">
            {Object.entries(userDetails).map(([key, value]) => {
              if (excludedKeys.includes(key)) return null;
              return (
                <div key={key}>
                  <p>{capitalizeKeys(key)}:</p>
                  {Array.isArray(value) ? (
                    <p className="text-lg">{value.join(", ")}</p>
                  ) : typeof value === "object" && value !== null ? (
                    Object.entries(value).map(([subKey, subValue]) => {
                      if (excludedKeys.includes(subKey)) return null;
                      return (
                        <p className="text-lg" key={subKey}>{`${capitalizeKeys(
                          subKey
                        )}: ${subValue}`}</p>
                      );
                    })
                  ) : (
                    <p className="text-lg">{value}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
