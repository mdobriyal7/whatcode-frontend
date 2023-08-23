import React from "react";
import City from "./features/city/Cities.jsx";
import Seats from "./features/seats/Seats.jsx";
import Login from "./features/auth/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import { ROLES } from "./config/roles.jsx";
import Cart from "./features/cart/Cart.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="city" element={<City />} />
              <Route path="seats" element={<Seats />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
