import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const {
    signInHandle,
    updateProfileHandle,
    githubLogin,
    setUser,
    googleHandle,
  } = use(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const registerHandel = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("");

    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordPattern.test(password) === true) {
      setErrorMessage(
        "Must have an Uppercase letter in the password, Must have a Lowercase letter in the password, Length must be at least 6 character"
      );
      return;
    }
    // Signed up
    signInHandle(email, password)
      .then((result) => {
        const user = result.user;

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

        //photo set
        updateProfileHandle({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  // google set up
  const googleSignInHandle = () => {
    googleHandle()
      .then((res) => {
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

          navigate(location?.state || "/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const githubHandle = () => {
    githubLogin()
      .then((res) => {
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

          navigate(location?.state || "/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Dynamic title
  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <>
      {/* <NavBar/> */}
      <div className={`mb-10 mt-10  min-h-screen p-10 bg-base-300`}>
        <div className="w-full mx-auto max-w-md p-10 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
          <h1 className="text-2xl font-bold text-center">Register</h1>
          <form onSubmit={registerHandel} className="space-y-6 ">
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-600">Your Name</label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-600">Photo URL</label>
              <input
                required
                type="photo"
                name="photo"
                id="photo"
                placeholder="photoURL"
                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
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
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-600">Password</label>
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
            >
              Sign in
            </button>
          </form>
          {errorMessage && (
            <p className="text-base text-red-600">{errorMessage}</p>
          )}
          <div className="flex justify-center space-x-4">
            <button
              onClick={googleSignInHandle}
              aria-label="Log in with Google"
              className="rounded-sm cursor-pointer"
            >
              <FcGoogle size={30} />
            </button>

            <button
              onClick={githubHandle}
              aria-label="Log in with GitHub"
              className="p-3 cursor-pointer rounded-sm"
            >
              <FaGithub size={30} />
            </button>

            <button
              aria-label="Log in with Twitter"
              className="p-3 text-blue-500 rounded-sm"
            >
              <FaTwitter size={30} />
            </button>
          </div>
          <p className="text-xs text-center sm:px-6 dark:text-gray-600">
            Have an account yet?
            <Link
              rel="noopener noreferrer"
              to="/login"
              className="underline dark:text-blue-800"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;