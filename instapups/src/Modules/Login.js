import React from 'react'

const Login = () => {

    function login() {
        window.location.href = "/"
    }

  return (
    <>
      <button id="login-btn" onClick={login}>
        Login
      </button>
    </>
  )
}

export default Login