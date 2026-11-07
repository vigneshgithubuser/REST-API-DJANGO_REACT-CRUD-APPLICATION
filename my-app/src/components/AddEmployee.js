import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { addEmployee } from "../services/api";

function AddEmployee() {

  const navigate = useNavigate();

  const [emp, setEmp] = useState({

    emp_id: "",

    emp_name: "",

    emp_email: "",

    emp_dept: "",

    emp_salary: "",

    emp_bonus: ""

  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setEmp({

      ...emp,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const payload = {

        emp_id: Number(emp.emp_id),

        emp_name: emp.emp_name.trim(),

        emp_email: emp.emp_email.trim(),

        emp_dept: emp.emp_dept.trim(),

        emp_salary: Number(emp.emp_salary),

        emp_bonus: Number(emp.emp_bonus)

      };

      const res = await addEmployee(payload);

      alert(

  "Employee Created Successfully"

);

      navigate("/dashboard");

    }
    catch (error) {

      console.log(error);

      setError(

        error.response?.data

          ? JSON.stringify(error.response.data)

          : "Failed to add employee"

      );

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "500px",
          width: "100%"
        }}
      >

        <div className="card-body p-5">

          <h3 className="text-center fw-bold mb-2">
            Add Employee
          </h3>

          <p className="text-center text-muted mb-4">
            Enter employee details
          </p>

          {error && (

            <div className="alert alert-danger text-center">

              {error}

            </div>

          )}

          <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">

              <input
                type="number"
                name="emp_id"
                className="form-control"
                id="emp_id"
                placeholder="Employee ID"
                value={emp.emp_id}
                onChange={handleChange}
                required
              />

              <label htmlFor="emp_id">
                Employee ID
              </label>

            </div>

            <div className="form-floating mb-3">

              <input
                type="text"
                name="emp_name"
                className="form-control"
                id="emp_name"
                placeholder="Name"
                value={emp.emp_name}
                onChange={handleChange}
                required
              />

              <label htmlFor="emp_name">
                Full Name
              </label>

            </div>

            <div className="form-floating mb-3">

              <input
                type="email"
                name="emp_email"
                className="form-control"
                id="emp_email"
                placeholder="Email"
                value={emp.emp_email}
                onChange={handleChange}
                required
              />

              <label htmlFor="emp_email">
                Email Address
              </label>

            </div>

            <div className="form-floating mb-3">

              <input
                type="text"
                name="emp_dept"
                className="form-control"
                id="emp_dept"
                placeholder="Department"
                value={emp.emp_dept}
                onChange={handleChange}
                required
              />

              <label htmlFor="emp_dept">
                Department
              </label>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <div className="form-floating">

                  <input
                    type="number"
                    name="emp_salary"
                    className="form-control"
                    id="emp_salary"
                    placeholder="Salary"
                    value={emp.emp_salary}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="emp_salary">
                    Salary
                  </label>

                </div>

              </div>

              <div className="col-md-6 mb-3">

                <div className="form-floating">

                  <input
                    type="number"
                    name="emp_bonus"
                    className="form-control"
                    id="emp_bonus"
                    placeholder="Bonus"
                    value={emp.emp_bonus}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="emp_bonus">
                    Bonus
                  </label>

                </div>

              </div>

            </div>
            
            <button
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >

              {loading
                ? "Saving..."
                : "Save Employee"}

            </button>

          </form>

          <div className="text-center mt-4">

            <Link
              to="/dashboard"
              className="text-decoration-none"
            >
              ← Back to Dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AddEmployee;