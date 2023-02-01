import MainPage from "./pages/Main Page/MainPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ContactUs from "./pages/Contact Us/ContactUs";
import MyProfile from "./pages/My Profile/MyProfile";
import StudyMaterials from "./pages/Study Materials/StudyMaterials";
import StudyMaterialsSingle from "./pages/Study Materials/StudyMaterialsSingle";

import { Link, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/studymaterials" element={<StudyMaterials />} />
        <Route path="/studymaterials/:id" element={<StudyMaterialsSingle />} />
      </Routes>
    </>
  );
}

export default App;
