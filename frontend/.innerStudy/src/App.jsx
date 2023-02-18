import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import MainPage from "./pages/Main Page/MainPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ContactUs from "./pages/Contact Us/ContactUs";
import MyProfile from "./pages/My Profile/MyProfile";
import StudyMaterials from "./pages/Study Materials/StudyMaterials";
import StudyMaterialsSingle from "./pages/Study Materials/StudyMaterialsSingle";
import TokenContext from "./contexts/authtoken";
import ResetContext from "./contexts/resetsucesscontext";
import Verify from "./pages/UserVerif/UserVerif";
import RegisterVerify from "./pages/Register/RegisterVerifyEmail";
import ResetPass from "./pages/Reset Password/Resetpass";
import VerifyPass from "./pages/Reset Password/Resetpassverif";
import TestSwiper from "./pages/TestingSwipper/swiper";
import axios from "axios";

import { Link, Route, Router, Routes } from "react-router-dom";

function App() {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("auth_token")
  );
  {
    /*We added this line so when the page refreshes the token still appears*/
  }
  const [newpassword, setnewPassword] = useState("");
  const [content, setContent] = useState([]);
  const [counter, setCounter] = useState([]);
  const [msgreset, setMsgreset] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/content`)
      .then((response) => response.data)
      .then((data) => setContent(data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/counter`)
      .then((response) => response.data);
  }, []);

  return (
    <>
      <TokenContext.Provider
        value={{ authToken: authToken, setAuthToken: setAuthToken }}
      >
        <ResetContext.Provider
          value={{ msgreset: msgreset, setMsgreset: setMsgreset }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/registerverify" element={<RegisterVerify />} />
            <Route path="/confirmation" element={<Verify />} />
            <Route path="/sendreset" element={<ResetPass />} />
            <Route path="/myprofile/:id" element={<MyProfile />} />
            <Route path="/testing" element={<TestSwiper />} />
            <Route path="passwordreset" element={<VerifyPass />} />
            <Route
              path="/studymaterials"
              element={<StudyMaterials content={content} counter={counter} />}
            />
            <Route
              path="/studymaterials/:id"
              element={<StudyMaterialsSingle />}
            />
          </Routes>
        </ResetContext.Provider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
