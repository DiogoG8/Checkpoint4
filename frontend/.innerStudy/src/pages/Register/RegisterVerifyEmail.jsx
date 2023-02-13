import react from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Register/Register.module.css";

const RegisterVerify = () => {
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handlerGoback = () => {
    navigate("/");
  };

  const handlerResendEmail = (event) => {
    event.preventDefault();

    const emailstorage = sessionStorage.getItem("Email");
    axios
      .post("http://localhost:5005/api/resendemail", {
        email: emailstorage,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  };

  return (
    <>
      <div className={styles.verifycontainer}>
        <div className={styles.verify1}>The Chalkboard</div>
        <div className={styles.verify}>
          Verify your account! An email was sent to your inbox, so you can
          proceed 📧
        </div>
        {errors ? (
          <div onClick={handlerGoback} className={styles.verify4}>
            Oops! Something went wrong. Back to the login page
          </div>
        ) : (
          <>
            <div onClick={handlerResendEmail} className={styles.verify4}>
              Didn't get any email? Resend it!
            </div>
            <Link className={styles.verify3} to="/">
              Oh, you are a registered user? Just login!
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default RegisterVerify;
