import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

// =========for authentication==========
import AuthProvider from "./authentication/authProvider";
// we import from the index in routes
import Routes from "./routes";
// ======================================



function App() {
  return (
    <>
      {/* <h1 
      // className="text-5xl font-bold underline"
      >
      Hello world!
    </h1> */}
    
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </>
  )
}

export default App
