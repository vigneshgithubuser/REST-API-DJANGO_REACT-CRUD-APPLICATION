import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteEmployee, getEmployees } from "../services/api";

function Dashboard() {

  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    } else {

      loadData();

    }

  }, []);

  const loadData = async () => {

    try {

      const res = await getEmployees();

      setEmps(res.data || []);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load employees");

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteEmployee(id);

      loadData();

      toast.success("Employee deleted successfully");

    } catch (error) {

      toast.error("Delete failed");

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

  };

  return (

    <div className="container-fluid">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="row min-vh-100">

        <div className="col-md-3 col-lg-2 bg-dark text-white p-3">

          <h4 className="text-center mb-4">
            Admin Panel
          </h4>

          <ul className="nav flex-column">

            <li className="nav-item mb-2">
              <Link to="/dashboard" className="nav-link text-white">
                Dashboard
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link to="/add" className="nav-link text-white">
                Add Employee
              </Link>
            </li>

            <li className="nav-item mt-4">
              <button
                onClick={handleLogout}
                className="btn btn-danger w-100"
              >
                Logout
              </button>
            </li>

          </ul>

        </div>

        <div className="col-md-9 col-lg-10 bg-light p-4">

          <h3 className="fw-bold mb-3">
            Employee Dashboard
          </h3>

          <div className="card shadow-lg border-0">

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table table-hover mb-0">

                  <thead className="table-dark text-center">

                    <tr>

                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Bonus</th>
                      <th>Actions</th>

                    </tr>

                  </thead>

                  <tbody className="text-center">

                    {emps.length === 0 ? (

                      <tr>

                        <td colSpan="7">
                          No employees found
                        </td>

                      </tr>

                    ) : (

                      emps.map((e) => (

                        <tr key={e.emp_id}>

                          <td>{e.emp_id}</td>

                          <td>{e.emp_name}</td>

                          <td>
                            {e.emp_email || "NO EMAIL"}
                          </td>

                          <td>{e.emp_dept}</td>

                          <td>{e.emp_salary}</td>

                          <td>{e.emp_bonus}</td>

                          <td>

                            <Link
                              to={`/edit/${e.emp_id}`}
                              className="btn btn-warning btn-sm me-2"
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(e.emp_id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;