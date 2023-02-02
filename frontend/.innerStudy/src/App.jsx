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
import IdContext from "./contexts/idcontext";
import axios from "axios";

import { Link, Route, Router, Routes } from "react-router-dom";

function App() {
  const [authToken, setAuthToken] = useState();
  const [id, setId] = useState();
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/content`)
      .then((response) => response.data)
      .then((data) => setContent(data));
  }, []);

  return (
    <>
      <TokenContext.Provider
        value={{ authToken: authToken, setAuthToken: setAuthToken }}
      >
        <IdContext.Provider value={{ id: id, setId: setId }}>
          <Routes>
            {/*Route path="/" element={<Login />} />*/}
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mainpage" element={<MainPage />} />
            {/*<Route path="/myprofile/:id" element={<MyProfile />} />*/}
            <Route
              path="/studymaterials"
              element={<StudyMaterials content={content} />}
            />
            <Route
              path="/studymaterials/:id"
              element={<StudyMaterialsSingle />}
            />
          </Routes>
        </IdContext.Provider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
