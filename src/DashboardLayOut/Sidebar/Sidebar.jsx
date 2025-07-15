import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router";
import UserMenu from "../Menu/UserMenu";
import AgentMenu from "../Menu/AgentMenu";
import AdminMenu from "../Menu/AdminMenu";
import MenuItem from "../Menu/MenuItem";
import { FcSettings } from "react-icons/fc";
import useUserroll from "../../hooks/userRoll";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { logOutHandle } = useAuth();

  const [isActive, setActive] = useState(false);
  const [roll, isRollLoading] = useUserroll();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

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

  if (isRollLoading) return <LoadingSpinner />;
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link className="flex items-center font-extrabold" to="/">
              <img
                // className='hidden md:block'
                src="/logo.png"
                alt="logo"
                width="100"
                height="100"
              />

              <h1>Dreams Estate</h1>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button cursor-pointer p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full  shadow-lg rounded-lg justify-center items-center bg-gray-200 mx-auto">
              <Link className="flex items-center font-extrabold" to="/">
                <img
                  // className='hidden md:block'
                  src="/logo.png"
                  alt="logo"
                  width="100"
                  height="100"
                />

                <h1>Dreams Estate</h1>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items user or Agent or Admin menu*/}
              {roll === "user" && <UserMenu />}

              {roll === "agent" && <AgentMenu />}

              {roll === "admin" && <AdminMenu />}
              {/* <AdminMenu /> */}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            roll={roll}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
