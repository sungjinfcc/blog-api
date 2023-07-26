import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext";

function Commentcard({ postId, comment, getComments }) {
  const { token } = useAuth();
  const [onEdit, setOnEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const api = process.env.REACT_APP_API_BASE_URL;
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }
    try {
      const response = await fetch(
        `${api}/post/${postId}/comment/${comment._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      if (!response.ok) {
        setError("Update failed. Please try again.");
        return;
      }
      setOnEdit(false);
      getComments();
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleEdit = () => {
    setOnEdit(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${api}/post/${postId}/comment/${comment._id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setError("Only authorized users can delete this comment.");
        return;
      }
      getComments();
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    setMessage(comment.message);
  }, []);

  return (
    <div>
      {onEdit ? (
        <form>
          <input
            id="message"
            type="text"
            value={message}
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          {formErrors.message && (
            <p className="error-message">This field is required</p>
          )}
          <button onClick={handleSubmit}>Submit</button>
        </form>
      ) : (
        <>
          <p>{comment.message}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Commentcard;
