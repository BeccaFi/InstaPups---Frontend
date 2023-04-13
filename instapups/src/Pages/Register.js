import React, { useState } from "react";

const Register = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

  const onChangeUsername = (event) => {
    setUsernameValue(event.target.value);
  };

  const onChangePassword = (event) => {
    setPasswordValue(event.target.value);
  };

  const onChangeRepeatPassword = (event) => {
    setRepeatPasswordValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        className="register-username"
        onChange={onChangeUsername}
        value={usernameValue}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-password"
        onChange={onChangePassword}
        value={passwordValue}
      />
      <input
        type="password"
        placeholder="Repeat password"
        className="register-repeat-password"
        onChange={onChangeRepeatPassword}
        value={repeatPasswordValue}
      />
      <button className="register-button" onClick={goToLogin}>
        Register
      </button>
      <p className="register-error-message"></p>
    </div>
  );
};

export default Register;

async function goToLogin() {
  const response = await fetch("https://fakestoreapi.com/products/1");
  const data = await response.json();
  console.log(data);
  //TODO: Gör en fetch till backend med POST, lägg till användaren i databasen
  // if (response.status === 200) {
  // window.location = "/";
  // }
}
