import React from "react";

const Login = () => {
  return (
    <div>
      <input type="text" placeholder="Username" className="login-username" />
      <input type="password" placeholder="Password" className="login-password" />
      <button className="login-button" onClick={goToProfile}>
        Login
      </button>
    </div>
  );
};

export default Login;

function goToProfile() {
  //TODO: Gör en fetch till backend med POST, om login är korrekt gå till /profile
  window.location = "/profile";
}
