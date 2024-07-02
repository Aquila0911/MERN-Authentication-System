import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDisplay from "./LoginDisplay";
import LoginError from "./LoginError";
import { useAuth } from "../../utils/AuthService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitCount, setSubmitCount] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);
  const { authService } = useAuth();

  const navigate = useNavigate();

  // To update username on input change
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // To update password on input change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // To update state on display button click
  const handleDisplayData = (e) => {
    e.preventDefault(); // To prevent default form submission
    setIsDisplay(true);
  };

  const handleDisplay = () => {
    setIsDisplay(false);
  };

  // Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await authService.login(username, password);
    if (result.success) {
      console.log(result.message);
      navigate("/details-page");
    } else {
      setErrorMessage(result.message);
      setSubmitCount((prevCount) => prevCount + 1);
      console.log("Error Caught:", result.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div className="h-40 w-64 mt-8 ">
          <h1 className="text-5xl sm:text-6xl md:text-7xl p-4 mt-[7%] mb-4 text-black flex justify-center">
            Login
          </h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsername}
              className="w-full h-8 p-4 border-gray-700 rounded text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              className="w-full mt-8 h-8 p-4 border-gray-700 rounded text-black"
            />

            <div className="flex justify-evenly pt-9">
              <button
                type="button"
                onClick={handleDisplayData}
                className="transition-all duration-500 
            hover:bg-green-400 hover:border-gray-700 hover:shadow-2xl hover:opacity-90 hover:scale-110
            inline border-2 border-black px-5 py-2 rounded-md text-black"
              >
                Display
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="transition-all duration-500 
            hover:bg-green-400 hover:border-gray-700 hover:shadow-2xl hover:opacity-90 hover:scale-110
            inline border-2 border-black px-5 py-2 rounded-md text-black"
              >
                Submit
              </button>
            </div>
          </form>
          {errorMessage && (
            <LoginError message={errorMessage} errorDisp={submitCount} />
          )}
          {isDisplay && (
            <LoginDisplay
              username={username}
              password={password}
              onClose={handleDisplay}
            />
          )}
        </div>
      </div>
    </>
  );
}
