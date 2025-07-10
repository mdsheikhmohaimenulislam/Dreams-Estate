import React, { useEffect } from "react";
import { Link, useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();
  
    // Dynamic title
    useEffect(() => {
      document.title = "Error";
    }, []);

    if (error.status === 404) {
    return (
      // First empty fragment then call Navbar or paste then ok

      <div className="overflow-hidden">
        <div className="card  w-180 mx-auto">
          <h1 className="text-center text-gray-600 text-6xl font-bold p-6">
            404
          </h1>
          <figure className=" justify-center align-center items-center flex">
            <img
              className="w-120"
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt="404"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-center text-gray-500 text-5xl font-bold">
              Look like you're lost
            </h2>
            <p className="text-center text-gray-500 mt-2">
              the page you are looking for not avaible!
            </p>
            <div className="mx-auto">
              <Link to="/">
                <button className="btn bg-green-700 text-white rounded-md">
                  Go To Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Error;
