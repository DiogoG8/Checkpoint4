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
  const [errors, setErrors] = useState("");

  function handleSubmit(event) {
    console.log("hey", authToken, window);
    if (authToken != null || window == null) return;

    const authTokenFromsessionStorage = sessionStorage.getItem("auth_token");
    console.log("hey2", authTokenFromsessionStorage);
    if (authTokenFromsessionStorage != null) {
      setAuthToken(authTokenFromsessionStorage);
      return;
    }
    console.log("hey3");
    axios
      .post("http://localhost:5005/api/login", {
        email,
        password,
      })

      .then((res) => {
        const token = res.data.token;
        if (token == null) {
          console.error("token is null");
          return;
        }
        sessionStorage.setItem("auth_token", token);
        setAuthToken(token);
        navigate("/mainpage");
      })
      .catch((error) => {
        if (error.response.status === 422 || error.response.status === 401) {
          setErrors(
            <div className={styles.linkstyle}>
              <div>The email or password is incorrect. Check again! 🕐</div>
            </div>
          );
        } else if (error.response.status === 400) {
          setErrors(
            <div className={styles.linkstyle}>
              <div>The email isn't verified! Check your email 📧</div>
            </div>
          );
        } else if (error.response.status === 500) {
          setErrors(
            <div className={styles.linkstyle}>
              <div>The email doesn't exist!</div>
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
                type="password" //It puts the *
                value={password}
              />
            </div>
          </form>
          <button onClick={handleSubmit} className={styles.button}>
            <span>Sign In</span>
          </button>
          {errors}
          <Link className={styles.link} to="/register">
            Not a member? Sign Up Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
