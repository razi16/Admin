import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../layout/Main";
import axios from "axios";

function Login() {
  const loginContext = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message !== "Success") {
          setInvalid(res.data.message);
        } else {
          localStorage.setItem("x-access-token", res.data.token);
          setInvalid(null);
          loginContext.loginDispatch("login");
          navigate("/item");
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    const headers = {
      token: token,
    };
    axios.get("http://localhost:4000/auth", { headers }).then((res) => {
      if (res.data.isLoggedIn === true) {
        navigate("/item");
      }
    });
  }, []);

  return (
    <main>
      <h1 className="text-center">Login</h1>
      <form className="ms-3" method="POST" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="form-control w-25"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control w-25"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {invalid === null ? (
        <></>
      ) : (
        <div className="alert alert-danger d-inline-block mt-3 ms-3">
          {invalid}
        </div>
      )}
    </main>
  );
}

export default Login;
