import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./components/HomePage";

function App() {
  // For API call to /api
  const [backendData, setBackendData] = useState("");

  // useEffect to prevent infinite loop
  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setBackendData(response.data);
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
