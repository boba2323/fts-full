// this is the index file for routes meaning we can simply export from ./routes

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth} from "../authentication/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import { Navigate, Outlet } from "react-router-dom";

import  Login  from "../pages/Login"; // Importing Login and Logout components
import  Logout from "../pages/Logout"; // Importing Login and Logout components
import Signup from "../pages/Signup"; // Importing Signup component

const Routes = () => {

    // we get the token from the compoenent that provides and consumes the context
  const { userIn , loading  } = useAuth();

  if ( !loading) {
    return <div>Loading...</div>; // or a spinner
  }

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(userIn ? routesForAuthenticatedOnly : []),
    ...(userIn === null ? routesForNotAuthenticatedOnly:[]),
    {
      path: "*",
      element: <Navigate to={userIn ? "/profile" : "/login"} replace />
    }
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;