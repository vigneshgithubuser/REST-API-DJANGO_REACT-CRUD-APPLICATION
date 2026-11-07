import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateAccount() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    email: "",

    password: ""

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://127.0.0.1:8000/create-account/",

        form

      );

      alert(res.data.message);

      navigate("/login");

    }
    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.error ||

        "Something went wrong"

      );

    }

  };

  return (

    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div
        className="card p-5 shadow"
        style={{ width: "400px" }}
      >

        <h3 className="text-center mb-4">

          Create Account

        </h3>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-success w-100">

            Create Account

          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateAccount;