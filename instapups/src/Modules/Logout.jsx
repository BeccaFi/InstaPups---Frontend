const Logout = () => {
  function logout() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  }

  return (
    <>
      <button id="logout-btn" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
