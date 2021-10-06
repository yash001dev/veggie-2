import React from "react";
import LoginPageCover from "../LoginPageCover/LoginPageCover";
import LoginPageForm from "../LoginPageForm/LoginPageForm";
import SignUpPageForm from "../SignUpPageForm/SignUpPageForm";
import LoginPageNav from "../LoginPageNav/LoginPageNav";

const url = window.location.href;
  const ProductionUrl = url.includes("http://localhost:3000")
    ? "http://localhost:3000"
    : "https://veggi365.com";

function SignupPage() {
    return (
        <div className="Loginpage_container">
      <div className="loginpage_navbar">
        <LoginPageNav ProductionUrl="signup" />
      </div>
      <div className="loginpage_content">
        <div className="loginpage_cover">
          <LoginPageCover ProductionUrl="signup" />
        </div>
        <div className="loginpg_form_container">
            <SignUpPageForm />
        </div>
      </div>
    </div>
    )
}

export default SignupPage
