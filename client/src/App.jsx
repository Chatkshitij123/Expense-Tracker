import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import PublicRoute from "./components/Public/pubicRoutes";
import { Toaster} from "react-hot-toast"

function App() {
  

  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/login" element={<PublicRoute>
      <Login />
    </PublicRoute>}/>
          <Route path="/signup" element={<PublicRoute>
      <SignUp />
    </PublicRoute>}/>
          <Route path="/dashboard" element={ <ProtectedRoute>
        <Home />
      </ProtectedRoute>}/>
          <Route path="/income" element={<ProtectedRoute>
        <Income />
      </ProtectedRoute>}/>
          <Route path="/expense" element={<ProtectedRoute>
        <Expense />
      </ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>

    <Toaster
      toastOptions={{
        className: "",
        style: {
          fontSize:'13px'
        },
      }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  //checks if token exist in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ) :
  (
    <Navigate to="/login" />
  )
}
