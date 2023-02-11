import React, { useDebugValue, useState, useEffect } from "react";
import axios from "axios";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (window.location.search) {
      const UrlParams = new URLSearchParams(window.location.search);
      const verifyCode = UrlParams.get("name");
      console.log(UrlParams);
      console.log(verifyCode);

      setVerificationCode(verifyCode);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/confirmation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verificationCode}`,
        },
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.response.data);
      });
  }, [verificationCode]);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Verify;
