import API from "../api/axios.config";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

    const { name, email, password } = formData;

    API.post("/register", { name, email, password })
      .then(function () {
        setFormData({});
        navigate("/login");
        toast.success("Account created successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          transition: Slide,
        });
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 w-96 shadow-md rounded-lg p-8">
        <Link to="/" className="mr-5 flex items-center justify-center font-bold mb-6">
          <img
            src="./src/assets/logo.png"
            alt="logo"
            className="w-7 h-7 rounded-full"
          />
          <p className="text-white text-2xl">Schedu</p>
          <p className="text-[#54DAA8] text-lg">Mate</p>
        </Link>
        <h2 className="text-blue-300 text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-blue-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="text-sm bg-bgcolor mb-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-blue-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="text-sm bg-bgcolor mb-2 px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-blue-200"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="text-sm bg-bgcolor px-4 py-2 w-full focus:outline-none focus:border-b-2 focus:border-blue-300"
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
          </div>
          {errorMessage && (
            <p className="text-xs text-red-500 mb-3">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white mt-3 py-2 px-4 rounded-sm hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
