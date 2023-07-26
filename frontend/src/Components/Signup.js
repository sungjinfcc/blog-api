import React, { useState } from "react";
import { useAuth } from "../authContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const [formErrors, setFormErrors] = useState({
    name: false,
    password: false,
    passwordConfirm: false,
  });

  const api = process.env.REACT_APP_API_BASE_URL;

  const validateForm = () => {
    const updatedErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
      passwordConfirm:
        password.trim() !== passwordConfirm.trim() ||
        passwordConfirm.trim() === "",
    };

    setFormErrors(updatedErrors);

    return Object.values(updatedErrors).every((error) => !error);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }
    try {
      const response = await fetch(`${api}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Signup failed. Please try again.");
        return;
      }

      const data = await response.json();

      login(data.token, data.user);

      // Save the token and user info in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);

      // Redirect to the authenticated home page
      alert(`${response.status} data: ${data.message}`);
      window.location.href = "/home";
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
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
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {formErrors.passwordConfirm && (
          <p className="error-message">Passwords do not match</p>
        )}
        <button onClick={handleSignup}>Signup</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Signup;
