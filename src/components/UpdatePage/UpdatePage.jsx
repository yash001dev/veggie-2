import React from "react";
import UpdateForm from "../UpdateForm/UpdateForm";
import update from "../../img/update.svg";

function LoginPage() {

  return (
    <div className="Loginpage_container">
      <div className="loginpage_content">
        <div className="loginpage_cover">
        <div className="LoginPageCover_container">
            <img className="loginpage_cover_img" src={update} alt="loginpage_cover" />
        </div>
        </div>
        <div className="loginpg_form_container">
            <UpdateForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
