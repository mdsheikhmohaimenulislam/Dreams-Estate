import { Navigate } from "react-router";

import useUserroll from "../hooks/userRoll";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const AdminPrivateRouter = ({ children }) => {
  const [roll, isRollLoading] = useUserroll();

  if (isRollLoading) return <LoadingSpinner />;
  if (roll === "admin") return children;
  return <Navigate to="/" />;
};

export default AdminPrivateRouter;
