import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function fetchdata() {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      try {
        const res = await axios.delete("http://localhost:5000/users/" + id);
        // navigate("/");
        location.reload();
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Users</h1>

      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.username}</td>
                <td>{d.email}</td>
                <td>{d.age}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
