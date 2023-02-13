import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TokenContext from "../../contexts/authtoken";
import styles from "../Reset Password/resetpass.module.css";

function ResetPass() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [sendreset, setSendreset] = useState(false);

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
    setSendreset(true);
  }

  function handleResetResend() {
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
      <div className={styles.title}>
        The Chalkboard
        <div className={styles.container1}>
          <form className={styles.container2}>
            In order to reset the password, send a request by filling the
            information below!
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
          {sendreset ? (
            <div className={styles.linkstyle}>
              <div>
                If you have a verified account, you should receive an email!
              </div>
              <div className={styles.link4} onClick={handleResetResend}>
                Didn't receive? Try to resend it again!
              </div>
            </div>
          ) : (
            <button onClick={handleReset} className={styles.button}>
              <span>Send Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
