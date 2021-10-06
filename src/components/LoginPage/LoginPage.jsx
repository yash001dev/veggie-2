import React from "react";
import LoginPageCover from "../LoginPageCover/LoginPageCover";
import LoginPageForm from "../LoginPageForm/LoginPageForm";
import SignUpPageForm from "../SignUpPageForm/SignUpPageForm";
import LoginPageNav from "../LoginPageNav/LoginPageNav";
import "./LoginPage.css";

function LoginPage() {
  localStorage.removeItem("updateStatus");
  return (
    <div className="Loginpage_container">
      <div className="loginpage_navbar">
        <LoginPageNav ProductionUrl="login" />
      </div>
      <div className="loginpage_content">
        <div className="loginpage_cover">
          <LoginPageCover ProductionUrl="login" />
        </div>
        <div className="loginpg_form_container">
          <LoginPageForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
