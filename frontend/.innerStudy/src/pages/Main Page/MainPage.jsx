import jwt_decode from "jwt-decode";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import TokenContext from "../../contexts/authtoken";

function MainPage() {
  return (
    <>
      <Navbar />
    </>
  );
}

export default MainPage;
