import react from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <Link to="/mainpage">Go Back</Link>

      <form>
        <label htmlFor="name">Change Name</label>
        <textarea
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="name"
          type="text"
          value={name}
        />
        <label htmlFor="email">Change Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="text"
          value={email}
        />
      </form>

      {name.length < 3 || !emailRegex.test(email) ? (
        <button disabled="disabled">Save Changes</button>
      ) : (
        <button onClick={handleSubmit}>Save Changes</button>
      )}
    </>
  );
}

export default MyProfile;
