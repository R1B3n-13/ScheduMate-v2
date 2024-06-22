import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useUserContext } from "../contexts/userContext";
import { FiHome } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import UserDropdown from "./UserDropdown";
import AddOrJoinDropdown from "./AddOrJoinDropdown";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const { isLoggedIn } = useAuthContext();
  const { userData } = useUserContext();

  return (
    <nav className="fixed w-full z-40 top-0 flex items-center text-lg py-7 px-7 font-medium bg-everforest-bg text-everforest-text">
      <Link to="/" className="flex items-center font-bold">
        <img
          src="./src/assets/logo.png"
          alt="logo"
          className="w-7 h-7 rounded-full"
        />
        <p className="text-white text-2xl">Schedu</p>
        <p className="text-[#54DAA8] text-lg">Mate</p>
      </Link>
      <div className="flex items-center justify-center ml-auto">
        <Link
          to="/"
          className="mr-10 flex items-center hover:scale-105 transition-all"
        >
          <FiHome className="mr-2" />
          Home
        </Link>
        {isLoggedIn === true && (
          <Link
            to="/classroom"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <SiGoogleclassroom className="mr-2" />
            Classroom
          </Link>
        )}
      </div>

      <NavbarDropdown />
      {isLoggedIn === true ? (
        <>
          <div className="ml-auto mr-10">
            <AddOrJoinDropdown />
          </div>
          <div className="relative">
            <UserDropdown userName={userData && userData.name} />
          </div>
        </>
      ) : (
        <div className="flex ml-auto">
          <Link
            to="/login"
            className="mr-10 flex items-center hover:scale-105 transition-all"
          >
            <AiOutlineLogin className="mr-2" />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center hover:scale-105 transition-all"
          >
            <RiUserAddLine className="mr-2" /> Register
          </Link>
        </div>
      )}
    </nav>
  );
}
