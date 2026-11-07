import { Link } from "react-router-dom";
import React from "react";

function Home() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
        
        <div className="card-body text-center p-5">
          
          <h2 className="card-title fw-bold mb-3">
            Employee Management System
          </h2>

          <p className="text-muted mb-4">
            Login to manage employees efficiently
          </p>

          <div className="d-grid gap-2">
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;