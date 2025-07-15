import { Navigate } from "react-router";
import useUserroll from "../hooks/userRoll";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

const AgentPrivateRouter = ({ children }) => {
  const [roll, isRollLoading] = useUserroll();

  if (isRollLoading) return <LoadingSpinner />;

  if (roll === "fraud") return <Navigate to="/" />; // or show error message
  if (roll === "agent") return children;

  return <Navigate to="/" />;
};

export default AgentPrivateRouter;
