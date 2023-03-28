import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ItemData() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/item/${id}`).then((res) => {
      setName(res.data.name);
      setType(res.data.type);
      setStock(res.data.stock);
    });
  }, []);

  const update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/item/${id}`, {
        id: id,
        name: name,
        type: type,
        stock: stock,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "update success") {
          setError(false);
          navigate("/item");
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <main>
      <form className="ms-3" method="PUT" onSubmit={update}>
        <label htmlFor="name">Id: </label>
        <input
          className="form-control w-25"
          id="id"
          name="id"
          type="number"
          value={id}
          disabled
        />
        <label htmlFor="name">Name: </label>
        <input
          className="form-control w-25"
          id="name"
          name="name"
          type="text"
          placeholder="Enter the product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="type">Type: </label>
        <input
          className="form-control w-25"
          id="type"
          name="type"
          type="text"
          placeholder="Enter the product type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="type">Stock: </label>
        <input
          className="form-control w-25"
          id="stock"
          name="stock"
          type="number"
          placeholder="Enter the product stock"
          value={stock}
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
          Update
        </button>
        <Link to="/item">
          <button className="btn btn-danger ms-2 mt-2">Cancel</button>
        </Link>
      </form>
    </main>
  );
}

export default ItemData;
