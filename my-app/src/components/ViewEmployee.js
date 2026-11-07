import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getEmployeeById } from "../services/api";

function ViewEmployee() {
  const { id } = useParams();
  const [emp, setEmp] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const res = await getEmployeeById(id);
      setEmp(res.data);
    };
    loadData();
  }, [id]);

console.log(emp)

  return (
    <div className="card p-4">
      <h3>Employee Details</h3>

      <p><b>ID:</b> {emp.employee?.emp_id}</p>
      <p><b>Name:</b> {emp.employee?.emp_name}</p>
      <p><b>Dept:</b> {emp.employee?.emp_dept}</p>
      <p><b>Salary:</b> {emp.employee?.emp_salary}</p>
      <p><b>Bonus:</b> {emp.employee?.emp_bonus}</p>

      <Link to="/" className="btn btn-secondary">Back</Link>
    </div>
  );
}

export default ViewEmployee;