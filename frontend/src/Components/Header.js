import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

function Header() {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();

  const signout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/home";
  };
  return (
    <div className="header">
      <Link to="/">
        <p className="title">Blog</p>
      </Link>
      {isAuthenticated ? (
        <div className="olduser">
          <Link to="/post/create">
            <button>Create Post</button>
          </Link>
          <button onClick={signout}>LogOut</button>
        </div>
      ) : (
        <div className="newuser">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
