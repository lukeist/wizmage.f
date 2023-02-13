import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Navbar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-10 transition-colors duration-300 ${
        scroll > 300 ? "bg-white" : "bg-transparent"
      }`}
    >
      <div
        className={`w-full flex justify-between items-center sm:px-8 px-4 py-3`}
      >
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/create"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
