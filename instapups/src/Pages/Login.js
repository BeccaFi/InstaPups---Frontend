import React, { useState } from "react";

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onChangeUsername = (event) => {
    setUsernameValue(event.target.value);
  };

  const onChangePassword = (event) => {
    setPasswordValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        className="login-username"
        onChange={onChangeUsername}
        value={usernameValue}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-password"
        onChange={onChangePassword}
        value={passwordValue}
      />
      <button className="login-button" onClick={goToProfile}>
        Login
      </button>
    </div>
  );
};

export default Login;

async function goToProfile() {
  // Test for fetching
  const response = await fetch("https://fakestoreapi.com/products/1");
  const data = await response.json();
  console.log(data);

  // TODO: if (response.status === 200) {
  // window.location = "/profile";
  // }
}
