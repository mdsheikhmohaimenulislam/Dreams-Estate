import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
