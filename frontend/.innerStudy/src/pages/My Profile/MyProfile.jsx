import react from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../My Profile/Myprofile.module.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

/* Might need two save buttons*/
function MyProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setErrors] = useState("");
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/users/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5005/api/users/${id}`, { name, email })
      .then((response) => response.data)
      .then((data) => console.log(data));
  };

  return (
    <>
      <Navbar />
      <div className={styles.title}>.innerStudy</div>
      <div className={styles.container0}>
        <div className={styles.container1}>
          <div className={styles.warning}>
            &#9888;&#65039; Be careful upon sharing sensitive information!
          </div>
          <form className={styles.container2}>
            <div>
              <div className={styles.flex}>
                <label htmlFor="name">Change Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                />
              </div>
              <div className={styles.flex1}>
                <label htmlFor="email">Change Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                />
              </div>
            </div>
          </form>
          {name.length < 3 || !emailRegex.test(email) ? (
            <button className={styles.button3} disabled="disabled">
              <span>Save Changes</span>
            </button>
          ) : (
            <button className={styles.button2} onClick={handleSubmit}>
              <span>Save Changes</span>
            </button>
          )}
        </div>
        <div className={styles.header}>
          <button className={styles.button1}>
            <Link className={styles.link} to="/mainpage">
              <span>Go Back!</span>
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyProfile;
