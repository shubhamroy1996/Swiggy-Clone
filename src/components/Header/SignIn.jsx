import React, { useState } from "react";

import { auth, signInWithGooglePopup } from "../../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const SignIn = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);

  const logGoogleUser = async () => {
    try {
      let data = await signInWithGooglePopup();
      console.log("User signed in successfully!");
      const userData = {
        name: data.user.displayName,
        profilePhoto: data.user.photoURL,
      };
      dispatch(addUserData(userData));
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("Error signing in:", err);
    }
  };

  const signOutGoogleUser = async () => {
    await signOut(auth);
    dispatch(removeUserData());

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {userData ? (
          <button
            onClick={signOutGoogleUser}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={logGoogleUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};
export default SignIn;
