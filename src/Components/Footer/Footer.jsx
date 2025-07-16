import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const { googleHandle } = use(AuthContext);

  // google set up
  const googleSignInHandle = () => {
    googleHandle()
      .then((res) => {
        // console.log(res);

        if (res) {
          toast.success("Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <footer
        className={`footer mt-20 footer-horizontal footer-center text-base-content rounded p-10 bg-base-300`}
      >
        <div className="flex items-center">
          <img
            className="-ml-6 md:ml-0 w-[60px] h-[50px]"
            src="/logo.png"
            alt=""
          />
          <h1 className="ml-0 text-2xl font-extrabold">Dreams Estate</h1>
        </div>
        <nav className="grid grid-flow-col gap-4">
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/properties" className="link link-hover">
            All properties
          </Link>
          <Link to="/dashboard" className="link link-hover">
            Dashboard
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <button
              onClick={googleSignInHandle}
              aria-label="Log in with Google"
              className="rounded-sm cursor-pointer"
            >
              <FcGoogle size={30} />
            </button>
            <a href="https://www.youtube.com/" className="cursor-pointer">
              <IoLogoYoutube className="text-red-600" size={30} />
            </a>
            <a href="https://www.facebook.com/" className="cursor-pointer">
              <FaFacebook size={30} className="text-blue-600" />
            </a>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
