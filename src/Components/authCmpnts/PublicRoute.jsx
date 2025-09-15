// src/components/auth/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import useStore from "../../Zustand/useAuthStore";

export const PublicRoute = ({ children }) => {
  const session = useStore((state) => state.session);

  if (session) return <Navigate to="/dashboard/overview" />;
  return children;
};
