import React from "react";
// import { CSSTransition } from "react-transition-group";

export default function LoginDisplay({ username, password, onClose }) {
  return (
    <>
      {(username || password) && (
        <div>
          <div className="flex justify-center">
            <button
              className="border-2 border-black px-3 py-1 mt-4 rounded-lg text-black hover:bg-red-600"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="mt-3 p-4 bg-gray-50 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold">Submitted Data:</h2>
            <p className="text-gray-700">Username: {username}</p>
            <p className="text-gray-700">Password: {password}</p>
          </div>
        </div>
      )}
    </>
  );
}
