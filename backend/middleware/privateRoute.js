// PrivateRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ element, ...rest }) => {
  const [cookie] = useCookies(["adminToken"]);

  return (
    <Route
      {...rest}
      element={cookie.adminToken ? element : <Navigate to="/admin/login" />}
    />
  );
};

export default PrivateRoute;
