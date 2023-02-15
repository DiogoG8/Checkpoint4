import react from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GButton from "../../components/Gbutton";
import styles from "../Contact Us/ContactUs.module.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

function ContactUs() {
  const [formsubmit, setFormsubmit] = useState(false);
  const [issue, setIssue] = useState("");
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5005/api/contact", { topic, issue, email })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setFormsubmit(true);
      });
  };

  return (
    <>
      <div className={styles.title}>.innerStudy</div>
      <div className={styles.container0}>
        <div className={styles.container1}>
          <form className={styles.container2}>
            <div className={styles.warning}>📪 Send us your message!</div>
            <div className={styles.selectmain}>
              <div className={styles.select}>Topic</div>
              <select>
                <option>Log In Problems</option>
                <option>Website Performance</option>
                <option>New Material Suggestion</option>
                <option>Update on the existing Materials</option>
                <option>Password Changes</option>
              </select>
            </div>
            <div className={styles.flex}>
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={styles.checkbox1}
                id="email"
                name="email"
                type="text"
                value={email}
              />
            </div>
            <div className={styles.flex}>
              <label htmlFor="topic">Title</label>
              <input
                onChange={(e) => setTopic(e.target.value)}
                className={styles.checkbox1}
                id="topic"
                name="topic"
                type="text"
                value={topic}
              />
            </div>
            <div className={styles.flex}>
              <label htmlFor="issue">Write your idea!</label>
              <input
                onChange={(e) => setIssue(e.target.value)}
                className={styles.checkbox2}
                id="issue"
                name="issue"
                type="text"
                value={issue}
              />
            </div>
            {topic.length > 5 && issue.length > 10 && emailRegex.test(email) ? (
              <button className={styles.button2} onClick={handleSubmit}>
                <span>Send Message!</span>
              </button>
            ) : topic.length > 5 && issue.length <= 10 ? (
              <button
                disabled="disabled"
                className={styles.button3}
                onClick={handleSubmit}
              >
                <span>Send Message!</span>
              </button>
            ) : topic.length <= 5 && issue.length > 10 ? (
              <button
                disabled="disabled"
                className={styles.button3}
                onClick={handleSubmit}
              >
                <span>Send Message!</span>
              </button>
            ) : (
              <button
                disabled="disabled"
                className={styles.button3}
                onClick={handleSubmit}
              >
                <span>Send Message!</span>
              </button>
            )}
            {formsubmit === true ? (
              <div>
                <p>
                  Your message will be checked by our team. Thanks for the
                  suggestion!
                </p>
              </div>
            ) : (
              ""
            )}
          </form>
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

export default ContactUs;
