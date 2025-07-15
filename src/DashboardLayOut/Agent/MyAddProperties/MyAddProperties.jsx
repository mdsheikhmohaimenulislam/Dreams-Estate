import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import MyPropertiesSingleCard from "./MyPropertiesSingleCard";
import axios from "axios";

const MyAddProperties = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch properties filtered by logged-in user email
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["myProperties", user?.email],
    enabled: !!user?.email, // only run when user email exists
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties`);
      // Filter properties owned by current user
      return res.data.filter((property) => property?.agent?.email === user?.email);
    },
  });



  

const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/properties/${id}`);
    return res.data;  // just the data here
  },
  onSuccess: (data, id) => {  // id is the variable passed to mutate()
    if (data.deletedCount) {
      Swal.fire("Deleted!", "Your property has been deleted.", "success");

      // Instantly remove from cache
      queryClient.setQueryData(["myProperties", user?.email], (old = []) =>
        old.filter((item) => item._id !== id)
      );

      // Refetch to keep data fresh (optional)
      queryClient.invalidateQueries(["myProperties", user?.email]);
    }
  },
});

  // Confirm deletion dialog and trigger mutation
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
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Update property in local cache (UI only)
  const handleUpdateMarathon = (updatedMarathon) => {
    queryClient.setQueryData(["myProperties", user?.email], (old) =>
      old.map((item) => (item._id === updatedMarathon._id ? updatedMarathon : item))
    );
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {properties.map((property) => (
        <MyPropertiesSingleCard
          key={property._id}
          property={property}
          handleDeleted={handleDeleted}
          handleUpdateMarathon={handleUpdateMarathon}
        />
      ))}
    </div>
  );
};

export default MyAddProperties;
