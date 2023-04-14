import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  async function goToLogin() {
    try {
      const response = await fetch("http://127.0.0.1:5051/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.text();

      if (response.status !== 201) {
        console.log(data);
        return;
      }

      if (response.status === 201) {
        window.location = "/";
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
      <button className="register-button" onClick={goToLogin}>
        Register
      </button>
      <p className="register-error-message"></p>
    </div>
  );
};

export default Register;
