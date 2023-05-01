import React, { useState } from "react";
import "../sass/Pages/Register.modules.scss";
import ErrorPopup from '../Modules/ErrorPopup'


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  async function registerUser(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://instapups-server.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.status === 201) return window.location = "/";

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
    <form className="register-wrapper wrapper" onSubmit={registerUser}>
      <input
        type="text"
        placeholder="Username"
        className="register-username"
        onChange={onChangeUsername}
        value={username}
      />
      <input
        type="password"
        placeholder="Password"
        className="register-password"
        onChange={onChangePassword}
        value={password}
      />
      <input
        type="password"
        placeholder="Repeat password"
        className="register-repeat-password"
        onChange={onChangeConfirmPassword}
        value={confirmPassword}
      />

      <p className="register-response">{response}</p>
      <button className="register-button" onClick={registerUser}>
        Register
      </button>
    </form>
    </>
  );
};

export default Register;
