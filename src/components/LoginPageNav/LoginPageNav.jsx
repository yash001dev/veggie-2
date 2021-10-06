import React from "react";
import "./LoginPageNav.css";

function LoginPageNav({ ProductionUrl }) {
  
  return (
    <div className="LoginPageNav_container">
      <div className="LoginPageNav_title">VEGGI 365</div>
      <div className="LoginPageNav_link">
        {ProductionUrl === "signup" ? "Register" : "Login"}
      </div>
    </div>
  );
}

export default LoginPageNav;
