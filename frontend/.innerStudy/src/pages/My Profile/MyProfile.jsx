import react from "react";
import { Link } from "react-router-dom";

/* Might need two save buttons*/
function MyProfile() {
  return (
    <>
      <Link to="/mainpage">Go Back</Link>
      <button>Save Changes</button>
    </>
  );
}

export default MyProfile;
