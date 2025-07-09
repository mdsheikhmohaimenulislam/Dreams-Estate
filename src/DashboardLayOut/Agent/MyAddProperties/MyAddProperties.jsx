import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import MyPropertiesSingleCard from "./MyPropertiesSingleCard";

const MyAddProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/properties`)
      .then((res) => res.json())
      .then((data) => {
        const filterProperties = data.filter(
          (properti) => properti?.agent?.email === user?.email
        );
        setProperties(filterProperties);
      })
      .catch((error) => {
        console.error("Failed to load Properties:", error.message);
      });

    document.title = "My Properties List";
  }, [user]);



  // Deleted section
  const handleDeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // console.log(result);
      // Start Deleted the marathon

      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your marathon has been deleted.",
                icon: "success",
              });
            }
            // filter section
            const remainingMarathon = properties.filter(
              (filterMarathon) => filterMarathon._id !== id
            );
            setProperties(remainingMarathon);
          });
      }
    });
  };


//   



  return (
    <>
      {/* <NavBar /> */}
      <div className=" mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-10">
        {properties.map((property) => (
          <MyPropertiesSingleCard
            key={property?._id}
            property={property}
            handleDeleted={handleDeleted}
          />
        ))}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MyAddProperties;
