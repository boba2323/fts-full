// this is the index file for routes meaning we can simply export from ./routes
// https://reactrouter.com/6.28.0/start/tutorial#nesting-routes


// https://reactrouter.com/start/data/routing

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth} from "../authentication/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import { Navigate, Outlet } from "react-router-dom";

import  Login  from "../pages/Login"; // Importing Login and Logout components
import  Logout from "../pages/Logout"; // Importing Login and Logout components
import Signup from "../pages/Signup"; // Importing Signup component

import Loading from "../components/Loading/Loading";

import FileList from "../components/File/FileList";
import FileUpload from "../components/FileUpload/FileUpload";
import FtsDashBoard from "../components/Dashboard/FtsDashboard";
import DashboardMain from "../components/DashboardMain/DashboardMain";
import Team from "../components/Team/Team";
import AdminPanel from "../components/AdminSupervisor/AdminPanel";

import CreateTeam from "../components/AdminSupervisor/CreateTeam";
import AdminTeam from "../components/AdminSupervisor/AdminTeam";
import AdminUser from "../components/AdminSupervisor/AdminUser"
import AdminTeamDelete from "../components/AdminSupervisor/AdminTeamDelete";

import UserList from "../components/UsersList/UserList";
import AdminUserDelete from '../components/AdminSupervisor/AdminUserDelete'
import AdminAC from "../components/AdminSupervisor/AdminAC";
import CreateAC from "../components/AdminSupervisor/CreateAccCode";

import AdminAccCodeDelete from "../components/AdminSupervisor/AdminAccCodeDel";

import AdminModification from "../components/AdminSupervisor/AdminModification";
import TeamView from "../components/Team/TeamView";

const FallbackRedirect = () => {
  const { userIn, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (userIn) {
    return <Navigate to="/fts" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const Routes = () => {

    // we get the token from the compoenent that provides and consumes the context
  const { userIn , loading  } = useAuth();

  if ( loading) {
    return <Loading/>; // or a spinner
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
    // https://reactrouter.com/6.28.0/start/tutorial#nesting-routes
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute basically returns an OUTLET if authorised or rediects if not
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
        {
          path: "/fts",
          element: <FtsDashBoard />,
          // https://reactrouter.com/6.28.0/start/tutorial#nesting-routes
          // the places where we want the child component to be i.e the component we will replace with int he child url route
          // will be represented by <Outlet/>
          children: [
            {
                path: "",
                element: <h1><DashboardMain/></h1>
              },
              {
                path: "upload-file",
                element: <div><FileUpload/></div>,
              },
              {
                path: "users",
                element: <div><UserList/></div>,
              },
              {
                path: "files",
                element: <div><FileList/></div>,
              },
              {
                path: "teams",
                element: <div><Team/></div>,
              },
              {// https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd
                  // https://reactrouter.com/start/data/routing
                path: "admin",
                element: <div><AdminPanel/></div>,
              },
              // to figure out what the relative urls shuld be, check the urls where the components are nbeing rendered in 
              // the routes in other words in the indedx of the Routes. Then the child compoenet should be rendered 
              // at a path relative from there
              {
                path: "admin/admin-team",
                element: <h1><AdminTeam/></h1>,
              },
              {
                path: "admin/admin-team/:teamId",
                element: <h1><TeamView/></h1>,
              },
              {
                path: "admin/create-team",
                element: <h1><CreateTeam mode="create"/></h1>
              },
              {
                path: "admin/admin-team/update/:teamId",
                element: <><CreateTeam mode="update"/></>
              },
              {
                path: "admin/admin-team/delete/:teamId",
                element: <h1><AdminTeamDelete/></h1>,
              },
              {
                path: "admin/admin-user",
                element: <><AdminUser/></>
              },
              {
                path: "admin/admin-user/delete/:userId",
                element: <><AdminUserDelete/></>
              },
              {
                path:"admin/admin-accesscode",
                element:<AdminAC/>
              },
              {
                path:'admin/create-accesscode',
                element:<CreateAC mode='create'/>
              },
              {
                path:"admin/admin-accesscode/:id",
                element:<CreateAC mode="update"/>,
              },
              {
                path:'admin/admin-accesscode/delete/:id',
                element:<AdminAccCodeDelete/>
              },
              {
                path:'admin/admin-modification',
                element:<AdminModification/>
              },
              
            ]
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
      element: <FallbackRedirect />
    }
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;