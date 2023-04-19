const Logout = () => {
  async function logout() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    try {
      const response = await fetch("http://localhost:5051/auth/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        console.log(response.statusText);
      }
      window.location = "http://localhost:3000/";
    } catch (error) {
      console.log(error);
    }
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
