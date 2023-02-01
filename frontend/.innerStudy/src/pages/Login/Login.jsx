import react from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  function handleSubmit(event) {
    return (
      <button>
        <Link to="/register">Not a member? Sign Up Now!</Link>
      </button>
    );
  }
}

export default Login;
