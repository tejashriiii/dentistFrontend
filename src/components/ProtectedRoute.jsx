// components/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const ProtectedRoute = ({ allowedRoles }) => {
  const role = getUserRole();

  if (!role) return <Navigate to="/login" />; 
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />; 

  return <Outlet />;
};

export default ProtectedRoute;