import react from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Register() {
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const [formsubmit, setFormsubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tos, setTos] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5005/api/users", {
        name,
        email,
        password,
        tos,
        newsletter,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
      });
  };

  const handleTOS = () => {
    setTos(!tos);
  };

  const handleNewsletter = () => {
    setNewsletter(!newsletter);
  };

  return (
    <>
      <button>
        <Link to="/mainpage">Go Back</Link>
      </button>

      <form>
        <label htmlFor="name">User Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="name"
          type="text"
          value={name}
        />
        <label htmlFor="email">Email</label>
        <textarea
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="text"
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="text"
          value={password}
        />

        <label htmlFor="tos">
          <input
            type="checkbox"
            name="checkbox-checked"
            checked={tos}
            onChange={handleTOS}
          />
          You agree with the Terms of Service?
        </label>
        <label htmlFor="news">
          <input
            type="checkbox"
            name="checkbox-checked"
            checked={newsletter}
            onChange={handleNewsletter}
          />
          Do you want to receive info about our newsletter? You better!
        </label>
        {name.length < 3 ||
        !emailRegex.test(email) ||
        password.length <= 10 ||
        tos === false ? (
          <>
            <button disabled="disabled" onClick={handleSubmit}>
              Create an Account
            </button>
            <ul>
              <li>* Your user name needs to be over two digits;</li>
              <li>
                * Your user email should be something lie: diogo@gmail.com;
              </li>
              <li>* Your password needs to be more than ten digits;</li>
              <li>* You have to agree with the terms of service, duh! 🌝 </li>
            </ul>
          </>
        ) : (
          <button onClick={handleSubmit}>
            <Link to="/login">Create an Account</Link>
          </button>
        )}
      </form>
    </>
  );
}

export default Register;
