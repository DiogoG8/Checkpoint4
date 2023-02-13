import React, { useDebugValue, useState, useEffect } from "react";
import axios from "axios";
import styles from "../UserVerif/UserVerif.module.css";
import { Link } from "react-router-dom";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    <div className={styles.verify}>
      {errorMsg ? (
        errorMsg
      ) : (
        <div className={styles.verify2}> Welcome to Chalkboard</div>
      )}
      <Link className={styles.verify3} to="/">
        Go back to the login page!
      </Link>
    </div>
  );
};

export default Verify;
