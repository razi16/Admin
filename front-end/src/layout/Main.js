import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "../pages/Create";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import ItemData from "../pages/ItemData";
import Login from "../pages/Login";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import Register from "../pages/Register";
import Navbar from "./Navbar";

export const LoginContext = React.createContext();

const initialState = false;

const reducer = (state, action) => {
  switch (action) {
    case "login":
      return true;
    case "logout":
      return false;
    default:
      return state;
  }
};

function Main() {
  const [login, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ loginState: login, loginDispatch: dispatch }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/item" element={<Dashboard />} />
            <Route path="/item/create" element={<Create />} />
            <Route path="/item/:id" element={<ItemData />} />
          </Route>
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default Main;
