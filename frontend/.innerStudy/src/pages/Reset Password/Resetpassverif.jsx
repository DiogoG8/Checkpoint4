import React, { useDebugValue, useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../Reset Password/resetverif.module.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import ResetContext from "../../contexts/resetsucesscontext";

const VerifyPass = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { msgreset, setMsgreset } = useContext(ResetContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [buttonshow, setButtonshow] = useState(false);
  const [buttonshow2, setButtonshow2] = useState(false);
  const [checkpass, setCheckpass] = useState("");
  const [checktoken, setChecktoken] = useState("");

  const togglePassword = (event) => {
    event.preventDefault();
    setButtonshow(!buttonshow);
  };

  const togglePassword2 = (event) => {
    event.preventDefault();
    setButtonshow2(!buttonshow2);
  };

  useEffect(() => {
    setCheckpass("");
  }, [error]);

  useEffect(() => {
    setError("");
    setCheckpass("");
  }, [newpassword]);

  function handleChangePass(e) {
    e.preventDefault();
    if (newpassword === passwordRepeat) {
      axios
        .put("http://localhost:5005/api/updatepassword", {
          email,
          newpassword,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setMsgreset(
            <div className={styles.linkstyle}>
              Congratulations, your account was updated
            </div>
          );
          navigate("/");
        })
        .catch((error) => {
          console.log(error);

          setError(
            <div className={styles.flex111}>
              Your new password should have over 10 digits!
            </div>
          );
        });
    } else {
      setCheckpass(
        <div className={styles.flex111}>The passwords don't match!</div>
      );
      return;
    }
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
    console.log("Test1");

    axios
      .get("http://localhost:5005/api/veryfypass", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verificationCode}`,
        },
      })

      .then((response) => response.data)
      .then((data) => {
        const emailcode = jwt_decode(verificationCode).email;
        console.log(emailcode);
        setEmail(emailcode);
        console.log("Test Success");
      })

      .catch((err) => {
        setChecktoken(<div>Test!</div>);
      });
  }, [verificationCode]);

  return (
    <div className={styles.container0}>
      {checktoken ? (
        <div className={styles.title}>
          The Chalkboard
          <div className={styles.container10}>
            Oops, something went wrong! Get back to the login and try to reset
            the password again!
          </div>
          <Link className={styles.verify3} to="/">
            Go back to the login page!
          </Link>
        </div>
      ) : (
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
                  type={buttonshow ? "text" : "password"}
                  value={newpassword}
                />
                <button
                  className={styles.eye}
                  onClick={togglePassword}
                ></button>
              </div>
              <div className={styles.flex}>
                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type={buttonshow2 ? "text" : "password"}
                  value={passwordRepeat}
                />
                <button
                  className={styles.eye2}
                  onClick={togglePassword2}
                ></button>
              </div>
              <button onClick={handleChangePass} className={styles.button}>
                <span>Change Password</span>
              </button>
              {error}
              {checkpass}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPass;
