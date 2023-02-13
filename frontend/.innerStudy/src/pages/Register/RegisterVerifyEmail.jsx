import react from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Register/Register.module.css";

const RegisterVerify = () => {
  const [semail, setsEmail] = useState("");

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
        <div onClick={handlerResendEmail} className={styles.verify4}>
          Didn't get any email? Resend it!
        </div>
        <Link className={styles.verify3} to="/">
          Oh, you are a registered user? Just log in!
        </Link>
      </div>
    </>
  );
};

export default RegisterVerify;
