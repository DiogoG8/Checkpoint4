import React, { useDebugValue, useState, useEffect } from "react";
import axios from "axios";
import styles from "../Reset Password/resetverif.module.css";
import { Link } from "react-router-dom";

const VerifyPass = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window.location.search) {
      console.log("Retrieving token from URL");
      const UrlParams = new URLSearchParams(window.location.search);
      const verifyCode = UrlParams.get("name");
      setVerificationCode(verifyCode);
    }
  }, []);

  useEffect(() => {
    if (verificationCode == null || verificationCode === "") {
      return;
    }
    console.log("Sending API Request");
    axios
      .get("http://localhost:5005/api/confirmation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verificationCode}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((errorMsg) => {
        if (errorMsg.response.status === 404) {
          console.log("This is an error");
          setErrorMsg(
            <div className={styles.verify2}>
              Your account is already verified!
            </div>
          );
        }
      });
  }, [verificationCode]);

  return (
    <div className={styles.container0}>
      <div className={styles.title}>
        The Chalkboard
        <div className={styles.container1}>
          In order to reset the password, send a request by filling the
          information below!
          <form className={styles.container2}>
            <div className={styles.flex}>
              <label htmlFor="email">Old Password</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="password"
                value={email}
              />
            </div>
            <div className={styles.flex}>
              <label htmlFor="password">New Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password" //It puts the *
                value={password}
              />
            </div>
            <button className={styles.button}>
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPass;
