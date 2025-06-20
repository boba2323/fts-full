import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authentication/authProvider";

export const ProtectedRoute = () => {
  // the useAuth hook we exported from authProvider. it is doing several things, it creates a context,
  // provides the context too children props, and also consumes the context too so we dont need to do
  // all that stuff here, we see a large amount of encapsulation here

  // in other words, the context has already been consumed elesewhere and just used here? maybe right maybe wrong

  // destructuring going on, only token extracted and setToken ignored
  const { userIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner
  }

  // Check if the user is authenticated
  if (!userIn) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};