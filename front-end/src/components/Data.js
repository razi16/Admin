import React from "react";
import { Link } from "react-router-dom";

function Data(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.type}</td>
      <td>{props.stock}</td>
      <td>
        <Link to={`${props.id}`}>
          <button className="btn btn-secondary me-2">Update</button>
        </Link>
        <button className="btn btn-danger" onClick={props.handleClick}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Data;
