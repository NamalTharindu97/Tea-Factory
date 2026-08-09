import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext({ user: null, ready: false, setUser: () => {}, logout: () => {} });

export const normalizeRole = (role) => (role === "Supplier Manager" ? "Suplier Manager" : role);

export const ROLE_HOME = {
  "HR Manager": "/hr/dashboard",
  "Inventory Manager": "/InventoryAdminPanal",
  "Suplier Manager": "/SupplierAdminPanal",
  "Production Manager": "/ProductionAdminPanal",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setReady(true);
      return;
    }
    axios
      .get("/employees/current")
      .then((res) => setUser(res.data))
      .catch(() => {
        // The global 401 interceptor handles clearing the token.
      })
      .finally(() => setReady(true));
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      setUser,
      logout,
      role: user ? normalizeRole(user.role) : null,
    }),
    [user, ready, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
