import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, ROLE_HOME } from "../context/AuthContext";

export const RequireRole = ({ roles, children }) => {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (!roles.includes(role)) return <Navigate to={ROLE_HOME[role] || "/"} replace />;
  return children;
};

export default RequireRole;
