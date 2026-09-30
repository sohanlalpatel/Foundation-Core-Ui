import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  return (
    <Routes>
       <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

       <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />

       <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

       <Route
        path="/customers"
        element={
          isLoggedIn ? (
            <Customers setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

       <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
