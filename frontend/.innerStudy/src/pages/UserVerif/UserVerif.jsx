import React, { useDebugValue, useState, useEffect } from "react";
import axios from "axios";
import styles from "../UserVerif/UserVerif.module.css";
import { Link } from "react-router-dom";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

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
        } else if (errorMsg.response.status === 403) {
          setErrorMsg2(
            <div className={styles.verify2}>
              Oops, something went wrong!
              <div className={styles.verify4}>
                Go back to the login page, and try to login with your user info.
                If you are not verified a message to verify the account, should
                appear!
              </div>
            </div>
          );
        }
      });
  }, [verificationCode]);

  return (
    <div className={styles.verify}>
      {errorMsg ? (
        errorMsg
      ) : errorMsg2 ? (
        errorMsg2
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
