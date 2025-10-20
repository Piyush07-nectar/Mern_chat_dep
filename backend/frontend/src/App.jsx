import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Left from "./home/leftpart/left";
import Right from "./home/rightpart/right";
import Signup from "./compo/Signup";
import Login from "./compo/Login";
import { useAuth } from "./context/Authenticate";
import Loading from "./compo/Loading";

function App() {
  const [auth] = useAuth();
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          auth ? (
            <div className="flex h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/signup"
        element={auth ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/login"
        element={auth ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}

export default App;
