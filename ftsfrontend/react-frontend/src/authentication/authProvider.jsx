// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

// we export here to fix this error
//  Could not Fast Refresh ("useAuth" export is incompatible). Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
// this is the AuthProvider component that wraps around the children components
// authprovider is used to wrapped the routes component in App.jsx
export const AuthProvider = ({ children }) => {
  // this function puts the userIn value inside the child components via context. we apply it at app.jsx
  const [userIn, setUserIn] = useState(undefined) //we can udefined or nothing
  const [loading, setLoading] = useState(true)  //this is for making sure we only load the pages when the endpoints are done hitted
  //  we will hit the me endpoint only once. it makes sense since otherwise we would be hitting them on each render
  // to not do that, we put it inside a useeffect with no dependency
  // then we can put the value(the user) we return in a context so we can move the value around other components
  useEffect (() => {
    const hitMeandFetch =async ()=> {
      try{
        const response = await axios.get('http://127.0.0.1:8000/accounts/me/', {
            headers: {
              'Content-Type': 'application/json'
              },
            withCredentials: true, // Optional: only needed if cookies are set
            
            })
        if (response.status === 200) {
          // success login 
            console.log("yes yes you can access me in auth you are logged in:", response.data);
            
          } else {
            console.error("you did not log in", response.data)
          }
        setUserIn(response.data)
       } catch (error) {
        setUserIn(null)
       } finally {
        setLoading(false)  //loading is over now wecan call the pages
       }
      }
      

    hitMeandFetch()
  },[])
  return (
    // thus you see what this component via context provides is the userIn object and the setter method. this is what we focus on
    <AuthContext.Provider value={{ userIn, setUserIn, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
 

// it exports useAuth, inside it has useContext it is consuming the context and is already used so we dont need to use it again
export const useAuth = () => {
  return useContext(AuthContext);
};


// this is the AuthProvider component that wraps around the children components
// export default AuthProvider;
// authprovider is used to wrapped the routes component in App.jsx