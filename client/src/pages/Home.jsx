import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-yellow-400 flex justify-center items-center border-solid border border-gray-700	 m-20 ">
      <div className="flex flex-col justify-center items-center m-24">
        <h1 className="text-3xl font-semibold text-blue-600 mb-14">
          AK2B TODO TASK
        </h1>
        <div className="flex">
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-white hover:text-black mr-8"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-white hover:text-black ml-8"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
