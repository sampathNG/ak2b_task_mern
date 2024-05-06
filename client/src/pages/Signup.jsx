import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleClick = () => {
    navigate("/signin");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, phone, email, password } = formData; // Get email and password from formData
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        phone,
        email,
        password,
      });
      console.log("User sign up successfull");
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="grid  ">
      <header className="bg-blue-500 w-screen h-20 flex justify-around items-start text-center">
        <h1 className="text-slate-800 text-xl text-center mt-6">
          AK2B MERN TASK
        </h1>
        {/* <Link to="/signin"> */}
        <button
          className="text-blue-700 mt-6 h-8 w-32 font-normal border-2 text-xl border-solid border-blue-700 bg-white hover:bg-black hover:text-white"
          onClick={handleClick}
        >
          Sign In
        </button>
        {/* </Link> */}
      </header>
      <div className="mt-32 flex justify-center ">
        <form className="w-4/12	   grid" onSubmit={handleSubmit}>
          <label className="ml-5">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
            required
            autoComplete="off"
          />
          <label className="ml-5">Phone Number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
            placeholder="Phone Number"
            required
            autoComplete="off"
          />
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
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
