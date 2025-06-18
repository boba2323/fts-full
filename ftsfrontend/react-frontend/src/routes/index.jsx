// this is the index file for routes meaning we can simply export from ./routes

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth} from "../authentication/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";

import  Login  from "../pages/Login"; // Importing Login and Logout components
import  Logout from "../pages/Logout"; // Importing Login and Logout components
import Signup from "../pages/Signup"; // Importing Signup component

const Routes = () => {

    // we get the token from the compoenent that provides and consumes the context
  const { userIn , loading  } = useAuth();

  if (userIn === undefined || loading) {
    return <div>Loading...</div>; // or a spinner
  }

  // Define public routes accessible to all users
  const routesForPublic = [
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
          element: <div><Logout /></div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <div><Login /></div>,
    },
    {
      path: "/signup",
      element: <div><Signup /></div>,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(userIn ? routesForAuthenticatedOnly : []),
    ...(!userIn ? routesForNotAuthenticatedOnly : []),
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;