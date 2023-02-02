import react from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Register/Register.module.css";

function Register() {
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tos, setTos] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5005/api/users", {
        name,
        email,
        password,
        tos,
        newsletter,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      });
  };

  const handleTOS = () => {
    setTos(!tos);
  };

  const handleNewsletter = () => {
    setNewsletter(!newsletter);
  };

  return (
    <>
      <div className={styles.container0}>
        <div className={styles.title}>
          .innerStudy
          <div className={styles.container1}>
            <form className={styles.container2}>
              <div className={styles.flex}>
                <label htmlFor="name">User Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                />
              </div>
              <div className={styles.flex}>
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                />
              </div>
              <div className={styles.flex}>
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="text"
                  value={password}
                />
              </div>
              <div>
                <div className={styles.flex2}>
                  <label htmlFor="tos">
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      name="checkbox-checked"
                      checked={tos}
                      onChange={handleTOS}
                    />
                  </label>
                  <div class="checkmark"></div>
                  Terms of Service
                </div>
                <div className={styles.flex3}>
                  <label htmlFor="news">
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      name="checkbox-checked"
                      checked={newsletter}
                      onChange={handleNewsletter}
                    />
                  </label>
                  <div class="checkmark"></div>
                  Do you want to receive our weekly newsletter?
                </div>
              </div>
              {name.length < 3 ||
              !emailRegex.test(email) ||
              password.length <= 10 ||
              tos === false ? (
                <>
                  <button
                    className={styles.button2}
                    disabled="disabled"
                    onClick={handleSubmit}
                  >
                    <span>Create Account</span>
                  </button>
                  <ul className={styles.list}>
                    <li>* Your user name needs to be over two digits;</li>
                    <li>
                      * Your user email should be something lie:
                      diogo@gmail.com;
                    </li>
                    <li>* Your password needs to be more than ten digits;</li>
                    <li>
                      * You have to agree with the terms of service, duh! 🌝
                    </li>
                  </ul>
                </>
              ) : (
                <button className={styles.button} onClick={handleSubmit}>
                  <Link className={styles.link} to="/">
                    <span>Create Account</span>
                  </Link>
                </button>
              )}
              <Link className={styles.link2} to="/">
                Oh, you are a registered user? Just log in!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
