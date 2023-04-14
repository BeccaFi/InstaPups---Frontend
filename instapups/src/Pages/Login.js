import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  async function goToProfile() {
    try {
      const response = await fetch("http://localhost:5051/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();

      if (response.status !== 200) {
        console.log(data);
        return;
      }

      if (response.status === 200) {
        window.location = "/home";
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        className="login-username"
        onChange={onChangeUsername}
        value={username}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-password"
        onChange={onChangePassword}
        value={password}
      />
      <button className="login-button" onClick={goToProfile}>
        Login
      </button>
    </div>
  );
};

export default Login;
