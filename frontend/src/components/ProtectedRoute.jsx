import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, allowedRole }) {
  const { role } = useContext(AuthContext);

  // not logged in
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // logged in but wrong role
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
