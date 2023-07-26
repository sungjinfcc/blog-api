import React from "react";
import { Link } from "react-router-dom";

function Postcard({ post }) {
  return (
    <div>
      <Link to={`/post/${post._id}`}>
        <h1>{post.title}</h1>
      </Link>
      <p>{post.author.username}</p>
      <p>{post.timestamp}</p>
    </div>
  );
}

export default Postcard;
