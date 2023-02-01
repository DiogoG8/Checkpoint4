import react from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useParams } from "react";

function StudyMaterialsSingle() {
  const [singlecontent, setSingleContent] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/content/${id}`)
      .then((response) => response.data)
      .then((data) => setSingleContent(data[0]));
  }, []);

  return (
    <>
      <Link to="/studymaterials">Hello</Link>
    </>
  );
}

export default StudyMaterialsSingle;
