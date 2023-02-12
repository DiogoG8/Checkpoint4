import react from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Register/Register.module.css";

const RegisterVerify = () => {
  return (
    <>
      <div className={styles.verifycontainer}>
        <div className={styles.verify1}>The Chalkboard</div>
        <div className={styles.verify}>
          Verify your account! An email was sent to your inbox, so you can
          proceed 📧
        </div>
        <div className={styles.verify2}>Didn't get any email? Resend it!</div>
        <Link className={styles.verify3} to="/">
          Oh, you are a registered user? Just log in!
        </Link>
      </div>
    </>
  );
};

export default RegisterVerify;
