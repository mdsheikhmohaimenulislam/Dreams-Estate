import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { IoIosContacts } from "react-icons/io";

const NavBar = () => {
  const { logOutHandle, user } = useAuth();

  //   logOut section
  const handleLogOut = () => {
    logOutHandle()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    toast.error("Log Out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const link = (
    <>
      {user && (
        <>
          <div className=" lg:ml-5">
            <NavLink className="font-extrabold text-xl" to="/dashboard">
              Dashboard
            </NavLink>
          </div>
        </>
      )}
    </>
  );

  const Links = (
    <>
      <div className="space-x-5">
        <NavLink className="text-xl font-extrabold" to="/">
          Home
        </NavLink>
        <br />
        <NavLink className="text-xl font-extrabold" to="/properties">
          All properties
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="bg-[#064d57] shadow-sm sticky top-0 z-50">
      <div className="navbar w-11/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm font-extrabold text-xl dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
              {link}
            </ul>
          </div>
          <Link to="/">
            <div className="flex items-center ">
              <img
                className="ml-3 md:ml-0 w-[50px] h-[40px] "
                src="/logo.png"
                alt=""
              />
              <h1 className="ml-0 text-xs text-white  md:text-lg font-extrabold">
                Dreams Estate
              </h1>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-white font-extrabold text-xl px-1">
            {Links}
            {link}
          </ul>
        </div>
        <div className="flex items-center relative group navbar-end space-x-3">
          {/* User Avatar */}
          {user && user.photoURL ? (
            <img
              className="w-[45px] h-[45px] rounded-full cursor-pointer"
              src={user.photoURL}
              alt="User Avatar"
            />
          ) : (
            <IoIosContacts size={45} className="cursor-pointer text-white" />
          )}

          {/* Hover Name Box */}
          {user && (
            <div className="absolute -top-[38px] mt-12 mr-15  right-0 bg-white border rounded shadow-md px-4 py-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              {user.displayName || "User"}
            </div>
          )}
        </div>
        {/* Auth Button */}
        <div className="  mr-5 hidden md:flex items-center gap-x-4">
          {user ? (
            <Link
              onClick={handleLogOut}
              className="btn bg-white text-black px-4 py-2"
            >
              Log Out
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn bg-white text-black px-4 py-2">
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-white text-black px-4 py-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
