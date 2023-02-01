import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <Link to="/studymaterials">Go Back</Link>
      <div>{topic}</div>
      <div>{content}</div>
    </>
  );
}

export default StudyMaterialsSingle;
