import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TokenContext from "../../contexts/authtoken";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, setAuthToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [error, setErrors] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5005/api/login", {
        email,
        password,
      })

      .then((res) => {
        const token = res.data.token;
        if (token == null) {
          console.error("No authentication token", res.data.error);

          return;
        } else {
          navigate("/mainpage");
          setAuthToken(token);
          window.localStorage.setItem("auth_token", token);
          console.log(token);
          console.log(localStorage);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setErrors(
            <div>
              The email or password is incorrect. Try again or create a new
              account!
            </div>
          );
        }
      });
  }

  return (
    <>
      <form>
        <label htmlFor="email">Email</label>
        <textarea
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="text"
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="text"
          value={password}
        />
      </form>

      <button onClick={handleSubmit}>
        <h3>Sign In</h3>
      </button>
      {error}

      <button>
        <Link to="/register">Not a member? Sign Up Now!</Link>
      </button>
    </>
  );
}

export default Login;
