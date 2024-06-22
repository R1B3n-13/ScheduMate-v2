import API from "../api/axios.config";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { motion } from "framer-motion";

export default function Login() {
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    API.post("/login", { email, password })
      .then(function () {
        setIsLoggedIn(true);
        setFormData({});
        navigate("/");
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-everforest-bgSoft w-96 shadow-lg rounded-lg p-8">
        <Link
          to="/"
          className="mr-5 flex items-center justify-center font-bold mb-6"
        >
          <img
            src="./src/assets/logo.png"
            alt="logo"
            className="w-7 h-7 rounded-full"
          />
          <p className="text-white text-2xl">Schedu</p>
          <p className="text-[#54DAA8] text-lg">Mate</p>
        </Link>
        <h2 className="text-everforest-header text-xl font-semibold mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-everforest-text"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="text-sm bg-everforest-select placeholder-gray-500 mb-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-everforest-text"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="text-sm bg-everforest-select placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-everforest-borderFocused"
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center mt-5 mb-4 select-none">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 accent-everforest-select cursor-pointer"
            />
            <span className="ml-2 text-everforest-text text-sm">
              Remember me
            </span>
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500 mb-3">{errorMessage}</p>
          )}
          <div className="mt-10 mb-3 text-end text-everforest-cyan text-xs hover:underline">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-everforest-blue text-everforest-text font-semibold mt-3 py-2 px-4 rounded-sm hover:bg-everforest-blueHover focus:outline-none focus:ring focus:ring-everforest-border"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
}
