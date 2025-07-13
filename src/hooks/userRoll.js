// import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserroll = () => {
  const { user ,loading} = useAuth();
  // const [roll, setRoll] = useState(null);
  // const [isRollLoading, setIsRollLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const { data: roll, isLoading: isRollLoading } = useQuery({
    queryKey: ["roll", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/roll/${user?.email}`);
      return data;
    },
  });

  // useEffect(() => {
  //   const fetchUserRoll = async () => {
  //     if (!user) return setIsRollLoading(false);

  //     try {
  //       const { data } = await axiosSecure(
  //         `/user/roll/${user?.email}`
  //       );
  //       setRoll(data?.roll);
  //     } catch (err) {
  //       console.error("Failed to fetch user roll:", err);
  //     } finally {
  //       setIsRollLoading(false);
  //     }
  //   };

  //   fetchUserRoll();
  // }, [user, axiosSecure]);

  return [roll?.roll, isRollLoading];
};

export default useUserroll;
