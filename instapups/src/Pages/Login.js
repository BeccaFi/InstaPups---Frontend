import React, { useState } from "react";
import "../sass/Pages/Login.modules.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  async function goToProfile(e) {
    e.preventDefault();

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

        if (response.status === 200) return window.location = "/home";

        setResponse(data); //Create nicer popup
   
    } catch (error) {
      setResponse(error) //Create nicer popup, for example "There seems to be an error with the server. Please try again later"
    }
  }

  return (
    <form className="login-wrapper wrapper" onSubmit={goToProfile}>
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

      <p className="login-response">{response}</p>
      <button className="login-button" onClick={goToProfile}>
        Login
      </button>
    </form>
  );
};

export default Login;
