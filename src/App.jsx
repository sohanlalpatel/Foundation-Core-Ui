import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
      />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/customers"
        element={isLoggedIn ? <Customers /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
