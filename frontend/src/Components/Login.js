import React, { useState } from "react";
import { useAuth } from "../authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: false,
    password: false,
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const api = process.env.REACT_APP_API_BASE_URL;

  const validateForm = () => {
    const updatedErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };

    setFormErrors(updatedErrors);

    return Object.values(updatedErrors).every((error) => !error);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    try {
      const response = await fetch(`${api}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Login failed. Please try again.");
        return;
      }

      const data = await response.json();

      login(data.token, data.user);

      // Save the token and user info in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to the authenticated home page
      window.location.href = "/home";
    } catch (apiError) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login">
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {formErrors.username && (
          <p className="error-message">This field is required</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formErrors.password && (
          <p className="error-message">This field is required</p>
        )}
        <button onClick={handleLogin}>Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
