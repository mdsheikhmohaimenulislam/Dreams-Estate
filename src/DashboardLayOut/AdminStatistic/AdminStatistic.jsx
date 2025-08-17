import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const AdminStatistics = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [allUserData, setAllUserData] = useState([]);
  const [makeOffer, setMakeOffer] = useState([]);
  const [singleProperties, setSingleProperties] = useState([]);

  const { user } = use(AuthContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/properties`)
      .then((res) => res.json())
      .then((data) => setAllProperties(data));

    //   makeOffer
    const fetchMakeOffer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/makeOffer`);
        const data = await res.json();
        setMakeOffer(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    // all user
    const fetchAllApplyList = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/allUser`);
        const data = await res.json(); // parse JSON
        setAllUserData(data); //  now it's the actual data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMakeOffer();
    fetchAllApplyList();
  }, []);

  //  Filter when marathons or user changes
  useEffect(() => {
    if (!user?.email) return;

    const filtered = allProperties.filter((m) => m.agent.email === user.email);
    setSingleProperties(filtered);
  }, [allProperties, user?.email]);



  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
          {/* Sales Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-[#124d57] to-[#124d57] text-white shadow-gray-500/40`}
            >
              <BsFillHouseDoorFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Property
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {allProperties.length}
              </h4>
            </div>
          </div>
          {/* Total Orders */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-[#124d57] to-[#124d57] text-white shadow-gray-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Orders
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {makeOffer.length}
              </h4>
            </div>
          </div>
          {/* Total Plants */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-[#124d57] to-[#124d57] text-white shadow-gray-500/40`}
            >
              <BsFillHouseDoorFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                My Property
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {singleProperties.length}
              </h4>
            </div>
          </div>
          {/* Users Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-[#124d57] to-[#124d57] text-white shadow-gray-500/40`}
            >
              <FaUserAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total User
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {allUserData.length}
              </h4>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/*Sales Bar Chart */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            {/* Chart goes here.. */}
          </div>
          {/* Calender */}
          <div className=" relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            {/* Calender */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
