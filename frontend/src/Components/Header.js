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
  };
  return (
    <div className="header">
      <Link to="/">
        <p className="title">Blog</p>
      </Link>
      {isAuthenticated ? (
        <div>
          <button onClick={signout}>LogOut</button>
        </div>
      ) : (
        <div className="newuser">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
