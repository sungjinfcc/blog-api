import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../authContext";
import Commentcard from "./Modules/Commentcard";

function PostDetail() {
  const { postId } = useParams();
  const { token } = useAuth();
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const api = process.env.REACT_APP_API_BASE_URL;
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    message: false,
  });
  const validateForm = () => {
    const updatedErrors = {
      message: message.trim() === "",
    };

    setFormErrors(updatedErrors);

    return Object.values(updatedErrors).every((error) => !error);
  };
  const getPostDetail = async () => {
    try {
      const response = await fetch(`${api}/post/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to get post detail. Please try again.");
        return;
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`${api}/post/${postId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Only authorized users can delete this post.");
        return;
      }
      window.location.href = "/home";
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(`${api}/post/${postId}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Something went wrong getting comments. Please try again.");
        return;
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }
    try {
      const response = await fetch(`${api}/post/${postId}/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        setError("Upload failed. Please try again.");
        return;
      }
      setMessage("");
      getComments();
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    getPostDetail();
    getComments();
  }, []);

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Post ID: {postId}</p>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author?.username}</p>
        <p>{post.timestamp}</p>
        <div className="buttons">
          <Link to={`/post/${post._id}/update`}>
            <button>Edit</button>
          </Link>

          <button onClick={deletePost}>Delete</button>
        </div>
        <form>
          <label htmlFor="message">Message</label>
          <input
            id="message"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {formErrors.message && (
            <p className="error-message">This field is required</p>
          )}
          <button onClick={handleSubmit}>Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}{" "}
        <div className="comments">
          {comments.map((comment) => {
            return (
              <Commentcard
                postId={postId}
                comment={comment}
                getComments={getComments}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
