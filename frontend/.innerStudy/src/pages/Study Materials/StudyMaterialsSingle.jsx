import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Study Materials/StudySingle.module.css";

function StudyMaterialsSingle() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/content/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setContent(data.content);
        setTopic(data.topic);
      });
  }, []);

  return (
    <>
      <div className={styles.container1}>
        <div className={styles.mainc}>
          <div className={styles.secc}>{topic}</div>
          <div className={styles.tcc}>{content}</div>
        </div>
        <div className={styles.header}>
          <button className={styles.button1}>
            <Link className={styles.link} to="/studymaterials">
              <h3>Go Back</h3>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default StudyMaterialsSingle;
