import React from "react";
import { Link } from "react-router-dom";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function Postcard({ post }) {
  const formattedDate = formatDate(post.timestamp);
  return (
    <Link to={`/post/${post._id}`}>
      <div className="postcard">
        <h1>{post.title}</h1>
        <p className="content">{post.content}</p>
        <h2>{post.author.username}</h2>
        <p className="timestamp">{formattedDate}</p>
      </div>{" "}
    </Link>
  );
}

export default Postcard;
