import react from "react";
import styles from "../components/Gbutton.module.css";
import { Link } from "react-router-dom";

function GButton() {
  return (
    <>
      <button className={styles.btn}>
        <span>
          <Link to="/mainpage">Go Back</Link>
        </span>
        <i></i>
      </button>
    </>
  );
}

export default GButton;
