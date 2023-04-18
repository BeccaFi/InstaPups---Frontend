import React, { useState } from "react";
import "../sass/Pages/Login.modules.scss";

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
      if (
        username.length > 36 ||
        username.length < 3 ||
        password.length > 30 ||
        password.length < 6
      ) {
        alert(
          "Username must be between 3 and 36 characters long\nPassword must be between 6 and 30 characters long\nTry again"
        );
        return;
      } else {
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
          alert(data);
          return;
        }

        if (response.status === 200) {
          window.location = "/home";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-wrapper wrapper">
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
