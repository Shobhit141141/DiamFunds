import React from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "🏠 Homepage", to: "/" },
  { label: "📊 Dashboard", to: "/dashboard" },
  { label: "📋 Start Fund Raiser", to: "/list-fund" },
];

const Navbar = () => {
  return (
    <div className="navbar h-[60px] bg-base-200 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
          >
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link to={"/"}>
        <div className="navbar-center flex justify-center items-center">
          <img
            src="/logo.png"
            alt=""
            className="w-[45px] h-auto object-cover"
          />
          <p className="text-3xl font-bold ml-2 ">DiamFund</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
