import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import TokenContext from "../../contexts/authtoken";

function MainPage() {
  const { authToken, setAuthToken } = useContext(TokenContext);

  const logoutHandler = () => {
    setAuthToken(undefined);
    localStorage.clear();
  };

  return (
    <>
      <button>
        <Link to="/mainpage">News</Link>
      </button>
      <button>
        <Link to="/studymaterials">Study Materials</Link>
      </button>
      <button>
        <Link to="/myprofile">My Profile</Link>
      </button>
      <button>
        <Link to="/contactus">Contact Us</Link>
      </button>
      <button onClick={logoutHandler}>
        <Link to="*">Log Out</Link>
      </button>
    </>
  );
}

export default MainPage;
