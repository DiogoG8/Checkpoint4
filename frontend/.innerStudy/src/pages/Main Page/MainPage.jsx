import jwt_decode from "jwt-decode";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import styles from "../Main Page/Mainpage.module.css";

function MainPage() {
  return (
    <>
      <div className={styles.container5}>
        <Navbar />
        <div className={styles.text7}>
          <div className={styles.text4}>
            <div className={styles.text}>Learn Better With</div>
            <div className={styles.text2}>.innerStudy</div>
            <div className={styles.text3}>
              .innerStudy is a platform that provides information about several
              coding topics so you can code like a pro!
            </div>
            <div className={styles.buttonborders}>
              <button className={styles.button}>
                <Link className={styles.link} to="/studymaterials">
                  Start Learning
                </Link>
              </button>
            </div>
          </div>
          <div className={styles.h_line}></div>
          <div className={styles.text6}>
            <div className={styles.text5}>
              <div className={styles.box1}>🕮</div>
              <div className={styles.box2}>
                Learn about your favorite topics such as Javascript, React or
                TypeScript!
              </div>
            </div>
            <div className={styles.text5}>
              <div className={styles.box1}>🕬</div>
              <div className={styles.box2}>
                Make yourself heard! Feel free to send us a message in the
                contact us section.
              </div>
            </div>
            <div className={styles.text5}>
              <div className={styles.box1}>⚠</div>
              <div className={styles.box2}>
                Manage your account freely. Just be careful of not sharing any
                info!
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
