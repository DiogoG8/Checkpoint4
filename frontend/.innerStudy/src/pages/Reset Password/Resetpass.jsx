import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TokenContext from "../../contexts/authtoken";
import styles from "../Reset Password/resetpass.module.css";

function ResetPass() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  function handleReset() {
    axios
      .post("http://localhost:5005/api/resetpassword", {
        email,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }

  return (
    <div className={styles.container0}>
      The Chalkboard
      <div className={styles.title}>
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
          </form>
          <button onClick={handleReset} className={styles.button}>
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
