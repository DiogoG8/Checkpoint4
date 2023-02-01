import { Link, Navigate } from "react-router-dom";

function MainPage() {
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
      <button>
        <Link to="*">Log Out</Link>
      </button>
    </>
  );
}

export default MainPage;
