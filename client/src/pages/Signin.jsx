import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleClick = () => {
    navigate("/signup");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));
      console.log("User signed in successfully");
      navigate("/todo");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <header className="bg-blue-500 w-screen h-20 flex justify-around items-start text-center">
        <h1 className="text-slate-800 text-xl text-center mt-6">
          AK2B MERN TASK
        </h1>
        <button
          className="text-blue-700 mt-6 h-8 w-32 font-normal border-2 text-xl border-solid border-blue-700 bg-white hover:bg-black hover:text-white"
          onClick={handleClick}
        >
          Sign Up
        </button>
      </header>
      <div className="mt-32 flex justify-center ">
        <form className="w-4/12	   grid" onSubmit={handleSubmit}>
          <label className="ml-5">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
            required
            autoComplete="off"
          />
          <label className="ml-5">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold  p-4 rounded  m-5 hover:bg-black"
            onClick={handleSubmit}
          >
            SIGNIN
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
