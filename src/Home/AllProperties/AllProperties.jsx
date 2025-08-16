import { useState, useEffect } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";

const AllProperties = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // actual query sent on submit
  // const [sortBy, setSortBy] = useState("MinimumPrice");
  const [sortOrder, setSortOrder] = useState("asc");
  const [properties, setProperties] = useState([]);

  // Fetch properties whenever searchQuery, sortBy, or sortOrder changes
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/properties`,
          {
            params: {
              search: searchQuery,
              // sortBy,
              sort: sortOrder,
            },
          }
        );
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    };
    document.title = "AllProperties";
    fetchProperties();
  }, [searchQuery, sortOrder]);

  // When user submits search form, update searchQuery to trigger fetch
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchText);
  };


  return (
    <div className="w-11/12 mx-auto mt-10">
      <div>
        {/* Sorting controls */}
        <div className="mb-10 flex justify-around gap-4 items-center ">
          {/* Search Form */}
          <form onSubmit={handleSearch} className=" flex gap-2">
            <input
              type="text"
              placeholder="Search by location..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input input-bordered w-full"
            />
            <button className="btn bg-[#004d56] text-white" type="submit">
              Search
            </button>
          </form>

          <div>
            <select
              className="select select-bordered"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.length === 0 ? (
          <p className="text-center col-span-3 text-red-500 mt-10">
            No properties found
          </p>
        ) : (
          properties.map((property) => (
            <SingleCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProperties;
