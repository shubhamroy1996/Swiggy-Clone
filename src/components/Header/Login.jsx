import React from "react";
import SignIn from "./SignIn";

function Login({ loginVisible, handleLogin }) {
  return (
    <div>
      <div className="w-full">
        <div
          onClick={handleLogin}
          className={
            "w-full bg-gray-900/50 z-30 h-full absolute  " +
            (loginVisible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white flex   w-full md:w-[562px] h-full p-5 z-40 fixed duration-500 " +
            (loginVisible ? "right-0" : "-right-[100%]")
          }
        >
          <div className=" m-3 w-full lg:w-[60%] ">
            <i className="fi-rr-arrow-left cursor-pointer" onClick={handleLogin}></i>
            <div className="my-10 w-full flex justify-between items-center">
              <h2 className="font-bold text-4xl border-b-2 border-black pb-5 ">
                Login
              </h2>
              <img
                className="w-28"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
              />
            </div>

            <SignIn />
            <p className="text-base mt-2 opacity-70">
              By clicking on Login, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
