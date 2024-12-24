import { Outlet, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};
const ProtectedRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoutes;
