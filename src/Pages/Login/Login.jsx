import { React, use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { Bounce, toast } from "react-toastify";

import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

const Login = () => {
  const {
    loginHandle,
    googleHandle,
    //  githubLogin
  } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showHide, setShowHide] = useState(false);

  const loginHandleContent = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const validationErrors = [];

    if (!/[A-Z]/.test(password)) {
      validationErrors.push("Must include an uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      validationErrors.push("Must include a lowercase letter.");
    }

    if (password.length < 6) {
      validationErrors.push("Must be at least 6 characters long.");
    }

    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors[0]); // Show the first error
      return;
    }

    setErrorMessage(""); // Clear errors before Firebase attempt

    loginHandle(email, password)
      .then(() => {
        navigate(location?.state || "/");
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
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error("incarcerated password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  // google set up
  const googleSignInHandle = () => {
    googleHandle()
      .then(() => {
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

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const githubHandle = () => {
  //     githubLogin()
  //       .then((res) => {
  //         console.log(res);
  //         toast.success("Successful", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: false,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });

  //         navigate(location?.state || "/");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  // Dynamic title
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <div className={`mb-10 p-10 min-h-screen bg-base-300`}>
        <div className="w-full mx-auto mt-15 max-w-md p-10 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form onSubmit={loginHandleContent} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-600">Email</label>
              <input
                required
                type="text"
                name="email"
                id="Email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className=" relative space-y-1 text-sm">
              <label className="label ">
                <span className="label-text">Password</span>
                <span
                  className="absolute z-10 top-8 left-80 p-1 rounded-xl cursor-pointer"
                  onClick={() => setShowHide(!showHide)}
                >
                  {showHide ? (
                    <AiTwotoneEye size={18} />
                  ) : (
                    <AiTwotoneEyeInvisible size={18} />
                  )}
                </span>
              </label>
              <input
                required
                type={showHide ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              <div className="flex justify-between text-xs dark:text-gray-600">
                {errorMessage && (
                  <p className="text-xs text-red-600">{errorMessage}</p>
                )}
                <a rel="noopener noreferrer " className="underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="block cursor-pointer w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-[#064d57]"
            >
              Login
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div
            onClick={googleSignInHandle}
            className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
          >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </div>
          <p className="text-xs text-center sm:px-6 dark:text-gray-600">
            Don't have an account?
            <Link
              rel="noopener noreferrer"
              to="/register"
              className="underline dark:text-[#064d57]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
