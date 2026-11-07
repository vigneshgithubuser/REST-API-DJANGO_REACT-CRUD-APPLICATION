import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Simulate API call
    localStorage.setItem("user", JSON.stringify(formData));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        
        <div className="card-body p-5">

          <h3 className="text-center fw-bold mb-2">Create Account</h3>
          <p className="text-center text-muted mb-4">
            Register to get started
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
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </small>
          </div>

          <div className="text-center mt-2">
            <Link to="/" className="text-decoration-none">
              ← Back to Home
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;