import React from "react";
import FooterM from "./footer.module.css";

function Footer() {
  return (
    <div className={FooterM.footer}>
      <div className={FooterM.text4}>
        <div className={FooterM.text1}>Checkpoint 4 -</div>
        <a href="https://www.wildcodeschool.com">
          <img
            className={FooterM.text3}
            src="../../src/assets/images/logo.png"
            alt="WCS"
          />
        </a>
      </div>
      <div className={FooterM.text2}>Diogo Oliveira</div>
    </div>
  );
}

export default Footer;
