import jwt_decode from "jwt-decode";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import TokenContext from "../contexts/authtoken";
import styles from "../components/navbar.module.css";

function Navbar() {
  const { authToken, setAuthToken } = useContext(TokenContext);

  const logoutHandler = () => {
    setAuthToken();
    localStorage.clear();
  };

  return (
    <>
      <ul className={styles.list}>
        <li className={styles.list1}>
          <button className={styles.button}>
            <Link className={styles.link} to="/mainpage">
              Main Page
            </Link>
          </button>
        </li>
        <li className={styles.list1}>
          <button className={styles.button}>
            <Link className={styles.link} to="/studymaterials">
              Study Materials
            </Link>
          </button>
        </li>
        <li className={styles.list1}>
          <button className={styles.button}>
            <Link
              className={styles.link}
              to={`/myprofile/${jwt_decode(authToken).sub}`}
            >
              My Profile
            </Link>
          </button>
        </li>
        <li className={styles.list1}>
          <button className={styles.button}>
            <Link className={styles.link} to="/contactus">
              Contact Us
            </Link>
          </button>
        </li>
        <li className={styles.list1}>
          <button className={styles.button} onClick={logoutHandler}>
            <Link className={styles.link} to="*">
              Log Out
            </Link>
          </button>
        </li>
      </ul>
      <div className={styles.h_line}></div>
    </>
  );
}

export default Navbar;
