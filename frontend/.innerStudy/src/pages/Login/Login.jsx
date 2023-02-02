import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TokenContext from "../../contexts/authtoken";
import styles from "../Login/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, setAuthToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [error, setErrors] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (authToken != null || window == null) return;

    const authTokenFromLocalStorage = window.localStorage.getItem("auth_token");
    if (authTokenFromLocalStorage != null) {
      setAuthToken(authTokenFromLocalStorage);
      return;
    }

    axios
      .post("http://localhost:5005/api/login", {
        email,
        password,
      })

      .then((res) => {
        const token = res.data.token;
        if (token == null) {
          return;
        }

        setAuthToken(token);
        navigate("/mainpage");

        window.localStorage.setItem("auth_token", token);
      })
      .catch((error) => {
        if (error.response.status === 422 || error.response.status === 401) {
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
    <div className={styles.container0}>
      <div className={styles.title}>
        .innerStudy
        <div className={styles.container1}>
          <form className={styles.container2}>
            <div className={styles.flex}>
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="text"
                value={email}
              />
            </div>
            <div className={styles.flex}>
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="text"
                value={password}
              />
            </div>
          </form>
          <button className={styles.button} onClick={handleSubmit}>
            <span>Sign In</span>
          </button>
          {error}

          <Link className={styles.link} to="/register">
            Not a member? Sign Up Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
