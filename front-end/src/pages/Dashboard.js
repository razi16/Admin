import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Data from "../components/Data";

function Dashboard() {
  const [name, setName] = useState("user");
  const [data, setData] = useState([]);
  const [reRender, setReRender] = useState(0);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:4000/item/${id}`).then((res) => {
      if (res.data.message === "deleted") {
        setReRender((prevState) => prevState + 1);
        console.log(reRender);
      }
    });
  };

  /* const deleteItem = (id) => {
    setReRender((prevState) => {
      return prevState + 1;
    });
    console.log(`${reRender}  ${id}`);
  }; */

  useEffect(() => {
    const token = localStorage.getItem("x-access-token");
    const headers = {
      token: token,
    };
    axios.get("http://localhost:4000/auth", { headers }).then((res) => {
      setName(res.data.name);
    });
    axios.get("http://localhost:4000/item").then((res) => {
      setData(res.data);
    });
  }, [reRender]);

  return (
    <main>
      <h1 className="text-center">Dashboard</h1>
      <p className="text-center"> Welcome {name}</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">type</th>
            <th scope="col">Stock</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Data
              key={item.id}
              id={item.id}
              name={item.name}
              type={item.type}
              stock={item.stock}
              handleClick={() => deleteItem(item.id)}
            />
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <Link to="/item/create">
          <button className="btn btn-primary d-inline-block">
            Add an item
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;
