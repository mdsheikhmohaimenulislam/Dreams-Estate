import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="hero bg-base-200  min-h-screen">
      <div className="hero-content p-0 flex-col lg:flex-row-reverse">
        <img
          src="https://i.ibb.co/cSjm1sNP/c11c8b313733385b2a366ecbf5903002.jpg"
          className="max-w-sm md:rounded-lg shadow-2xl w-93 md:w-full"
        />
        <div>
          <div className="p-8">
            <h1 className="text-5xl font-bold">Welcome to Dreams Estate</h1>
            <p className="py-6">
              Welcome to Dreams Estate — your trusted destination for buying
              premium properties with ease, security, and confidence.
            </p>
            <Link
              to="/properties
"
              className="btn bg-[#064d57] text-white"
            >
              All properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
