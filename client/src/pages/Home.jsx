import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { motion } from "framer-motion";
import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

export default function Home() {
  const { isLoggedIn } = useAuthContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    >
      <section>
        <div className="container flex mx-20 mt-32">
          <img
            src="../src/assets/logo.png"
            className="w-32 animate-spin drag-none select-none"
          />
          <div className="flex ml-1 font-extrabold">
            <p className="text-white text-[5rem] drag-none select-none">
              Schedu
            </p>
            <p className="text-[#54DAA8] text-[4.5rem] animate-bounce drag-none select-none">
              Mate
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-20 w-[calc(100vw-7rem)]">
          <div className="col-start-1 col-span-1">
            <div className="flex ml-72 mt-7 text-[2.3rem] text-slate-200 font-bold drag-none select-none">
              Simplify
              <p className="ml-4 text-everforest-red animate-pulse drop-shadow-xl">
                S
              </p>
              cheduling
              <p className="ml-4 ">Enhance</p>
              <p className="ml-4 text-everforest-green animate-pulse">L</p>
              earning
            </div>
            <p className="mt-16 ml-40 font-medium text-everforest-text text-2xl text-center drag-none select-none">
              Welcome to our innovative scheduling platform! Revolutionize the
              way you manage your educational journey with seamless organization
              and effortless coordination. Whether you're a student striving for
              success or an educator shaping futures, our platform empowers you
              to create, collaborate and conquer your schedule.
            </p>
            <Link to={isLoggedIn ? "/classroom" : "/login"}>
              <button className="ml-[26rem] mt-24 rounded-full bg-everforest-darkBlue drop-shadow-md hover:bg-everforest-darkBlueHover border border-everforest-border py-2 px-5 transition-all">
                Get Started
              </button>
            </Link>
            <FaSquareFacebook className="absolute text-3xl text-everforest-text bottom-8 left-24 drag-none select-none cursor-pointer" />
            <FaSquareXTwitter className="absolute text-3xl text-everforest-text bottom-8 left-36 drag-none select-none cursor-pointer" />
            <FaLinkedin className="absolute text-3xl text-everforest-text bottom-8 left-48 drag-none select-none cursor-pointer" />
          </div>
          <div className="col-start-2 col-span-1 flex justify-end items-center">
            <img
              src="../src/assets/boyAndCalendar.png"
              className="w-2/3 h-auto drag-none select-none"
            />
          </div>
        </div>

        <img
          src="../src/assets/Ellipse.png"
          class="z-20 animate-ping w-5 absolute left-24 top-80 drag-none select-none"
        />
        <img
          src="../src/assets/Ellipse.png"
          class="z-20 animate-ping w-11 absolute right-96 top-36 drag-none select-none"
        />
        <img
          src="../src/assets/Ellipse.png"
          class="z-20 animate-ping w-8 absolute left-64 bottom-32 drag-none select-none"
        />
        <img
          src="../src/assets/Ellipse.png"
          class="z-20 animate-ping w-7 absolute right-40 top-52 drag-none select-none"
        />
        <img
          src="../src/assets/Ellipse.png"
          class="z-20 animate-ping w-6 absolute right-20 bottom-20 drag-none select-none"
        />
      </section>
    </motion.div>
  );
}
