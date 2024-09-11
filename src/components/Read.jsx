import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  async function fetchdata() {
    try {
      const res = await axios.get("http://localhost:5000/users/" + id);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3>Detail Of Users</h3>

        <div className="mb-2">
          <strong>Name: {data.username}</strong>
        </div>

        <div className="mb-2">
          <strong>Email: {data.email}</strong>
        </div>

        <div className="mb-2">
          <strong>Age: {data.age}</strong>
        </div>

        <Link to={`/update/${id}`} className="btn btn-success">
          Update
        </Link>
        <Link to="/" className="btn btn-primary ms-3">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Read;
