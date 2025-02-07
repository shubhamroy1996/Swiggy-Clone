import React, { useState } from "react";

import { signInWithGooglePopup } from "../../config/firebaseAuth";

const SignIn = () => {
  const [error, setError] = useState(null);

  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
      console.log("User signed in successfully!");
    } catch (err) {
      setError(err.message);
      console.error("Error signing in:", err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={logGoogleUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign in with Google
        </button>

        {/* Optional: Add other sign-in methods here */}
      </div>
    </div>
  );
};
export default SignIn;
