import React from "react";

const Register = () => {
  return (
    <div>
      <input type="text" placeholder="Username" className="register-username" />
      <input type="password" placeholder="Password" className="register-password" />
      <input type="password" placeholder="Repeat password" className="register-repeat-password" />
      <button className="register-button" onClick={goToLogin}>
        Register
      </button>
      <p className="register-error-message"></p>
    </div>
  );
};

export default Register;

function goToLogin() {
  //TODO: Gör en fetch till backend med POST, lägg till användaren i databasen
  window.location = "/";
}
