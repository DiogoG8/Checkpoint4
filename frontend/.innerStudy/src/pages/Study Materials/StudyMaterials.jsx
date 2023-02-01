import { Link } from "react-router-dom";

function StudyMaterials({ content }) {
  return (
    <>
      <Link to="/mainpage">Go Back</Link>

      {content.slice(1, 2).map((contentinfo) => (
        <>
          <div
            key={contentinfo.id}
            topic={contentinfo.topic}
            content={contentinfo.content}
            type={contentinfo.Type}
          >
            <div>{contentinfo.Type}</div>
          </div>
        </>
      ))}
      {content
        .filter((contentfilter) => contentfilter.Type === "JavaScript")
        .map((contentinfo) => (
          <>
            <div
              key={contentinfo.id}
              topic={contentinfo.topic}
              content={contentinfo.content}
              type={contentinfo.Type}
            >
              <Link to={`/studymaterials/${contentinfo.id}`}>
                {contentinfo.topic}
              </Link>
            </div>
          </>
        ))}

      {content.slice(0, 1).map((contentinfo) => (
        <>
          <div
            key={contentinfo.id}
            topic={contentinfo.topic}
            content={contentinfo.content}
            type={contentinfo.Type}
          >
            <div>{contentinfo.Type}</div>
          </div>
        </>
      ))}

      {content
        .filter((contentfilter) => contentfilter.Type === "React")
        .map((contentinfo) => (
          <div
            key={contentinfo.id}
            topic={contentinfo.topic}
            content={contentinfo.content}
            type={contentinfo.Type}
          >
            <Link to={`/studymaterials/${contentinfo.id}`}>
              {contentinfo.topic}
            </Link>
          </div>
        ))}
    </>
  );
}

export default StudyMaterials;
