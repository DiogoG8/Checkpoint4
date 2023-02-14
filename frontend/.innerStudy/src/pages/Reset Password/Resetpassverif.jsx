import React, { useDebugValue, useState, useEffect } from "react";
import axios from "axios";
import styles from "../Reset Password/resetverif.module.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const VerifyPass = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [newpassword]);

  function handleChangePass(e) {
    const emailcode = jwt_decode(verificationCode).email;
    console.log(email);
    e.preventDefault();
    axios
      .put("http://localhost:5005/api/updatepassword", {
        email,
        newpassword,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (window.location.search) {
      const UrlParams = new URLSearchParams(window.location.search);
      const verifyCode = UrlParams.get("pass");
      setVerificationCode(verifyCode);
    }
  }, []);

  useEffect(() => {
    if (verificationCode == null || verificationCode === "") {
      return;
    }
    axios
      .get("http://localhost:5005/api/veryfypass", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verificationCode}`,
        },
      })
      .then((response) => {
        const emailcode = jwt_decode(verificationCode).email;
        console.log(emailcode);
        setEmail(emailcode);
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
              <label htmlFor="newpassword">New Password</label>
              <input
                onChange={(e) => setnewPassword(e.target.value)}
                id="newpassword"
                name="newpassword"
                type="password"
                value={newpassword}
              />
            </div>
            <button onClick={handleChangePass} className={styles.button}>
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPass;
