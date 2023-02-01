import react from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GButton from "../../components/Gbutton";
import styles from "../Contact Us/ContactUs.module.css";

function ContactUs() {
  const [formsubmit, setFormsubmit] = useState(false);
  const [issue, setIssue] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5005/api/contact", { topic, issue })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setFormsubmit(true);
      });
  };

  return (
    <>
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
            {topic.length > 5 && issue.length > 10 ? (
              <button className={styles.button2} onClick={handleSubmit}>
                <h3>Send your message!</h3>
              </button>
            ) : topic.length > 5 && issue.length <= 10 ? (
              <button
                disabled="disabled"
                className={styles.button2}
                onClick={handleSubmit}
              >
                <h3>Send your message!</h3>
              </button>
            ) : topic.length <= 5 && issue.length > 10 ? (
              <button
                disabled="disabled"
                className={styles.button2}
                onClick={handleSubmit}
              >
                <h3>Send your message!</h3>
              </button>
            ) : (
              <button
                disabled="disabled"
                className={styles.button2}
                onClick={handleSubmit}
              >
                <h3>Send your Message!</h3>
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
              <h3>Go Back</h3>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
