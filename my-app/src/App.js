import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import AddEmployee from "./components/AddEmployee";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/Dashboard";
import EditEmployee from "./components/EditEmployee";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {

  return (

    <Router>

      <Routes>

      

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add"
          element={<AddEmployee />}
        />

        <Route
          path="/edit/:id"
          element={<EditEmployee />}
        />
        <Route
          path="/create-account"
          element={<CreateAccount />}
        />
      </Routes>

    </Router>

  );
}

export default App;