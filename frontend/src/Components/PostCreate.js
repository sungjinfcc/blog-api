import React, { useState } from "react";
import { useAuth } from "../authContext";

function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const api = process.env.REACT_APP_API_BASE_URL;
  const [formErrors, setFormErrors] = useState({
    title: false,
    content: false,
  });
  const validateForm = () => {
    const updatedErrors = {
      title: title.trim() === "",
      content: content.trim() === "",
    };

    setFormErrors(updatedErrors);

    return Object.values(updatedErrors).every((error) => !error);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }
    try {
      const response = await fetch(`${api}/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        setError("Upload failed. Please try again.");
        return;
      }
      window.location.href = "/home";
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };
  return (
    <div>
      <h2>Create Post</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {formErrors.title && (
          <p className="error-message">This field is required</p>
        )}
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {formErrors.content && (
          <p className="error-message">This field is required</p>
        )}
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PostCreate;
