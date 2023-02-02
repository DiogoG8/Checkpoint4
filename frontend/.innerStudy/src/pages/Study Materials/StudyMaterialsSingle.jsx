import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Study Materials/StudySingle.module.css";
import Footer from "../../components/footer";
import DOMPurify from "dompurify";

function StudyMaterialsSingle() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/content/${id}`)
      .then((response) => response.data)
      .then((data) => {
        const cleancontent = DOMPurify.sanitize(data.content);
        const cleantopic = DOMPurify.sanitize(data.topic);
        setTopic(cleantopic);
        setContent(cleancontent);
      });
  }, []);

  return (
    <>
      <div className={styles.title}>.innerStudy</div>
      <div className={styles.warning}>
        🪄 Today you will learn about {topic}!
      </div>
      <div className={styles.h_line}></div>
      {content.includes("React") ? (
        <div className={styles.container1}>
          <div className={styles.mainc}>
            <div
              className={styles.tcc}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.container11}>
          <div className={styles.mainc}>
            <div
              className={styles.tcc}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )}

      <div className={styles.header}>
        <button className={styles.button1}>
          <Link className={styles.link} to="/studymaterials">
            <span>Go Back!</span>
          </Link>
        </button>
      </div>

      <Footer />
    </>
  );
}

export default StudyMaterialsSingle;
