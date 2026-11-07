import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "http://127.0.0.1:8000") + "/api/login/",
        form
      );

      const token =
        res.data.access ||
        res.data.token ||
        res.data.access_token;

      if (!token) {
        alert("Token missing from backend");
        return;
      }

      localStorage.setItem("token", token);

      const role =
        res.data.role ||
        res.data.user?.role;

      if (!role) {
        alert("Role missing from backend");
        return;
      }

      localStorage.setItem("role", role);

      if (role.toLowerCase() === "manager") {
        navigate("/dashboard");
      }
      else if (role.toLowerCase() === "employee") {
        navigate("/dashboard");
      }
      else {
        alert("Invalid role: " + role);
      }

    } catch (err) {

      alert("Invalid username or password");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "400px",
          width: "100%"
        }}
      >
        <div className="card-body p-5">

          <h3 className="text-center fw-bold mb-2">
            Welcome
          </h3>

          <p className="text-center text-muted mb-4">
            Login to your account
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="username">
                Username
              </label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">
                Password
              </label>
            </div>

            <button
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-2">
            <Link
              to="/"
              className="text-decoration-none"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
