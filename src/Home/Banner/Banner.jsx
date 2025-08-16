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
              Dreams Estate is a modern real estate platform dedicated to
              helping you find your perfect home, investment property, or
              rental. Whether you're buying, selling, or renting, we offer a
              seamless experience with a curated selection of properties, expert
              guidance, and cutting-edge tools to make your real estate journey
              effortless. Our mission is to turn your property dreams into
              reality with transparency, trust, and personalized service.
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
