import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [takenEmail, setTakenEmail] = useState(null);

  const register = (e) => {
    e.preventDefault();
    setTakenEmail(null);
    axios
      .post("http://localhost:4000/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Email has been taken") {
          setTakenEmail(true);
        } else {
          setTakenEmail(false);
        }
      });
  };

  return (
    <main>
      <h1 className="text-center">Register</h1>
      <form className="ms-3" method="POST" onSubmit={register}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control w-25"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
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
          Register
        </button>
      </form>
      {takenEmail === null ? (
        <></>
      ) : takenEmail === true ? (
        <div className="alert alert-danger d-inline-block mt-3" role="alert">
          Email has already been taken
        </div>
      ) : (
        <div className="alert alert-success d-inline-block mt-3" role="alert">
          Your account has been created
        </div>
      )}
    </main>
  );
}

export default Register;
