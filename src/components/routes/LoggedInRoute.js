import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import { LoadingOverlay } from "./../reusable/Loading";

// THIS IS THE ROUTE THAT IS ACCESSIBLE ONLY TO LOGGED IN USERS; USED MOSTLY FOR PROTECTING EXCLUSIVE PAGE AND COMPONENTS
const LoggedInOnlyRoute = ({ children }) => {
  const { isLoggedIn, loading, refreshAuth } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      refreshAuth();
    }
  }, [loading, isLoggedIn, refreshAuth]);

  if (loading) {
    return <LoadingOverlay message="Checking your login status..." />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default LoggedInOnlyRoute;