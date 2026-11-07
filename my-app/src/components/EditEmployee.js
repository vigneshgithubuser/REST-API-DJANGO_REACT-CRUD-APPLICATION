import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/api";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [emp, setEmp] = useState({
  emp_name: "",
  emp_email: "",
  emp_dept: "",
  emp_salary: "",
  emp_bonus: ""
});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getEmployeeById(id);
        const data = res.data.employee || res.data;

        if (!data) {
          setError("Employee not found");
          return;
        }

        setEmp({
  emp_name: data.emp_name || "",
  emp_email: data.emp_email || "",
  emp_dept: data.emp_dept || "",
  emp_salary: data.emp_salary || "",
  emp_bonus: data.emp_bonus || ""
});

      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Employee not found (404)"
            : "Failed to load employee data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateEmployee(id, emp);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" />
          <p className="text-muted">Loading employee...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card shadow-lg border-0" style={{ maxWidth: "500px", width: "100%" }}>
        
        <div className="card-body p-5">

          <h3 className="text-center fw-bold mb-2">
            Edit Employee
          </h3>
          <p className="text-center text-muted mb-4">
            Update employee details
          </p>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="emp_name"
                className="form-control"
                id="emp_name"
                placeholder="Employee Name"
                value={emp.emp_name}
                onChange={handleChange}
              />
              <label htmlFor="emp_name">Full Name</label>
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
              />
              <label htmlFor="emp_dept">Department</label>
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
                  />
                  <label htmlFor="emp_salary">Salary</label>
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
                  />
                  <label htmlFor="emp_bonus">Bonus</label>
                </div>
              </div>
            </div>

            <button
              className="btn btn-success w-100 btn-lg"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Employee"}
            </button>

          </form>

          <div className="text-center mt-4">
            <Link to="/dashboard" className="text-decoration-none">
              ← Back to Dashboard
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default EditEmployee;