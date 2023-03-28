import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";

function Create() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const create = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/item/create", {
        name: name,
        type: type,
        stock: stock,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "item created") {
          setError(false);
          navigate("/item");
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <main>
      <form className="ms-3" method="POST" onSubmit={create}>
        <label htmlFor="name">Name: </label>
        <input
          className="form-control w-25"
          id="name"
          name="name"
          type="text"
          placeholder="Enter the product name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="type">Type: </label>
        <input
          className="form-control w-25"
          id="type"
          name="type"
          type="text"
          placeholder="Enter the product type"
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="type">Stock: </label>
        <input
          className="form-control w-25"
          id="stock"
          name="stock"
          type="number"
          placeholder="Enter the product stock"
          onChange={(e) => setStock(e.target.value)}
        />

        {error ? (
          <div className="alert alert-danger d-inline-block mt-3 ms-3">
            Something unexpected happened
          </div>
        ) : (
          <></>
        )}

        <button type="submit" className="btn btn-primary mt-2">
          Add
        </button>
        <Link to="/item">
          <button className="btn btn-danger ms-2 mt-2">Cancel</button>
        </Link>
      </form>
    </main>
  );
}

export default Create;
