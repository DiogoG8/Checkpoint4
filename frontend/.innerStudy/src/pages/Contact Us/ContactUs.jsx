import react from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <button>
        <Link to="/mainpage">Go Back</Link>
      </button>

      <form>
        <select>
          Topic
          <option>Log In Problems</option>
          <option>Website Performance</option>
          <option>New Material Suggestion</option>
          <option>Update on the existing Materials</option>
          <option>Password Changes</option>
        </select>
        <div></div>
        {topic.length < 10}
        <label htmlFor="topic">Title</label>
        <input
          onChange={(e) => setTopic(e.target.value)}
          id="topic"
          name="topic"
          type="text"
          value={topic}
        />
        <label htmlFor="issue">Write your idea</label>
        <textarea
          onChange={(e) => setIssue(e.target.value)}
          id="issue"
          name="issue"
          type="text"
          value={issue}
        />
        {topic.length > 5 && issue.length > 10 ? (
          <button onClick={handleSubmit}>onSubmit your message!</button>
        ) : topic.length > 5 && issue.length <= 10 ? (
          <div>
            With the power of the useState, your save button will appear after
            you write an issue with over 10 digits🧙🪄
          </div>
        ) : topic.length <= 5 && issue.length > 10 ? (
          <div>
            With the power of the useState, your save button will appear after
            you write a topic with over 5 digits🧙🪄
          </div>
        ) : (
          <div>
            With the power of the useState, your save button will appear after
            you write a topic with over 5 digits and an issue over 10 digits🧙🪄
          </div>
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
    </>
  );
}

export default ContactUs;
