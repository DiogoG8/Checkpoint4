import jwt_decode from "jwt-decode";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../contexts/authtoken";
import styles from "../components/navbar.module.css";

function Navbar() {
  const { authToken, setAuthToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setAuthToken(undefined);
    window.localStorage.clear();
    navigate("/");
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
          <button className={styles.button5} onClick={logoutHandler}>
            Log Out
          </button>
        </li>
      </ul>
      <div className={styles.h_line}></div>
    </>
  );
}

export default Navbar;
{
  /*to={`/myprofile/${jwt_decode(authToken).sub}`}*/
}
