import React from "react";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";
import HomePage from "./components/HomePage";

function App() {
  // API call to /api
  useEffect(() => { // useEffect to prevent infinite loop
    axiosInstance
      .get("/api")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Error Caught:", error);
      });
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
