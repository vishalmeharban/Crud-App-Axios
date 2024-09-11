import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  // const [data, setData] = useState([]);
  const { id } = useParams();

  const [values, setValues] = useState({
    username: "",
    email: "",
    age: "",
  });

  const navigate = useNavigate();

  async function fetchdata() {
    try {
      const res = await axios.get("http://localhost:5000/users/" + id);
      setValues(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/users/" + id, values);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="username">Userame:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="enter Name"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="enter Age"
              min={0}
              value={values.age}
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
