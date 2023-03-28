import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./Main";

function Navbar() {
  const navigate = useNavigate();

  const loginContext = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("x-access-token");
    loginContext.loginDispatch("logout");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    if (token) {
      const token = localStorage.getItem("x-access-token");
      const headers = {
        token: token,
      };
      axios
        .get("http://localhost:4000/auth", { headers })
        .then((res) => {
          if (res.data.isLoggedIn === true) {
            loginContext.loginDispatch("login");
          } else {
            loginContext.loginDispatch("logout");
          }
        })
        .catch(() => {
          loginContext.loginDispatch("logout");
        });
    } else {
      loginContext.loginDispatch("logout");
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav fixed-right">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/item">
              Item
            </Link>
          </li>
        </ul>
        {loginContext.loginState ? (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
