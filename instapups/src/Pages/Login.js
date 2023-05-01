import React, { useState } from "react";
import "../sass/Pages/Login.modules.scss";
import ErrorPopup from '../Modules/ErrorPopup'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  async function goToProfile(e) {
    e.preventDefault();

    try {
        const response = await fetch("https://instapups.onrender.com/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.status === 200) return window.location = "/home";

        setResponse(data);
   
    } catch (error) {
      setErrorPopup(true);
      return;
    }
  }
  const closeErrorPopup = () => {
    setErrorPopup(false);
  };

  return (
    <>
    {errorPopup ? <ErrorPopup onClose={closeErrorPopup} /> : null}
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
    </>
  );
};

export default Login;
