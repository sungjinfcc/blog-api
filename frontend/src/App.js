import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import PostDetail from "./Components/PostDetail";
import PostCreate from "./Components/PostCreate";
import PostUpdate from "./Components/PostUpdate";
import { useAuth } from "./authContext";

function App() {
  const { login, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      login(token, user);
    } else {
      logout();
    }
  }, [login, logout]);

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/:postId/update" element={<PostUpdate />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
