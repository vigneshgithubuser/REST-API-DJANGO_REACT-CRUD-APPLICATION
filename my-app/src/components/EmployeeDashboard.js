import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

  const [employee, setEmployee] =
    useState({});

  const navigate = useNavigate();

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }
    else {

      loadProfile();

    }

  }, []);

  const loadProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        (process.env.REACT_APP_API_URL || "http://127.0.0.1:8000") + "/my-profile/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      setEmployee(data);

    }
    catch (error) {

      console.log(error);

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

  };

  return (

    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">
            Admin Dashboard
          </h2>

          <h5>
            Name :
            {employee.name}
          </h5>

          <h5>
            Department :
            {employee.department}
          </h5>

          <h5>
            Salary :
            ₹ {employee.salary}
          </h5>

          <h5>
            Bonus :
            ₹ {employee.bonus}
          </h5>

          <button
            className="btn btn-danger mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
}

export default EmployeeDashboard;