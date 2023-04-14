import "./sass/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Modules/Nav";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Feed from "./Pages/Profile";
import Members from "./Pages/Members";
import Member from "./Pages/Member";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Feed />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members:id" element={<Member />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
