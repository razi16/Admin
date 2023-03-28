import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import Login from "./Login";

function ProtectedRoutes() {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    const headers = {
      token: token,
    };
    axios.get("http://localhost:4000/auth", { headers }).then((res) => {
      console.log(res);

      if (res.data.isLoggedIn === false) {
        navigate("/login");
      }
    });
  }, []);

  return <Outlet />;
}

export default ProtectedRoutes;
