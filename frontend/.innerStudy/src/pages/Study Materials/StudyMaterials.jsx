import { Link } from "react-router-dom";
import styles from "../Study Materials/StudyMaterials.module.css";

function StudyMaterials({ content }) {
  return (
    <>
      <div className={styles.container1}>
        <div className={styles.mainc}>
          {content.slice(1, 2).map((contentinfo) => (
            <>
              <div
                className={styles.secc}
                key={contentinfo.id}
                topic={contentinfo.topic}
                content={contentinfo.content}
                type={contentinfo.Type}
              >
                <div>{contentinfo.Type}</div>
              </div>
            </>
          ))}
          <div className={styles.test}>
            {content
              .filter((contentfilter) => contentfilter.Type === "JavaScript")
              .map((contentinfo) => (
                <>
                  <div
                    className={styles.tcc}
                    key={contentinfo.id}
                    topic={contentinfo.topic}
                    content={contentinfo.content}
                    type={contentinfo.Type}
                  >
                    <Link
                      className={styles.link1}
                      to={`/studymaterials/${contentinfo.id}`}
                    >
                      {contentinfo.topic}
                    </Link>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className={styles.mainc1}>
          {content.slice(0, 1).map((contentinfo) => (
            <>
              <div
                className={styles.secc}
                key={contentinfo.id}
                topic={contentinfo.topic}
                content={contentinfo.content}
                type={contentinfo.Type}
              >
                <div>{contentinfo.Type}</div>
              </div>
            </>
          ))}
          <div className={styles.test}>
            {content
              .filter((contentfilter) => contentfilter.Type === "React")
              .map((contentinfo) => (
                <div
                  className={styles.tcc}
                  key={contentinfo.id}
                  topic={contentinfo.topic}
                  content={contentinfo.content}
                  type={contentinfo.Type}
                >
                  <Link
                    className={styles.link1}
                    to={`/studymaterials/${contentinfo.id}`}
                  >
                    {contentinfo.topic}
                  </Link>
                </div>
              ))}
          </div>
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

export default StudyMaterials;
