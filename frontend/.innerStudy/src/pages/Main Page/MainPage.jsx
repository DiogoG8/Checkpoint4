import jwt_decode from "jwt-decode";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import styles from "../Main Page/Mainpage.module.css";

function MainPage() {
  return (
    <>
      <Navbar />
      <div>
        <div className={styles.text4}>
          <div className={styles.text}>Learn Better With</div>
          <div className={styles.text2}>.innerStudy</div>
          <div className={styles.text3}>
            .innerStudy is a platform that provides information about several
            coding topics so you can code like a pro!
          </div>
          <button className={styles.button}></button>
        </div>
        <div className={styles.text6}>
          <div className={styles.text5}>
            <div>🕮</div>
            <div>I will write here some text</div>
          </div>
          <div className={styles.text5}>
            <div>🕬</div>
            <div>I will write here some text</div>
          </div>
          <div className={styles.text5}>
            <div>⚠</div>
            <div>I will write here some text</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
