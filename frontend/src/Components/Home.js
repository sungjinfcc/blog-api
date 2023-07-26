import React, { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import Postcard from "./Modules/Postcard";
import { Link } from "react-router-dom";

function Home() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const api = process.env.REACT_APP_API_BASE_URL;

  const getPosts = async () => {
    try {
      const response = await fetch(`${api}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {user ? <p>Welcome back!</p> : null}
      <Link to="/post/create">Create Post</Link>
      {posts.map((post) => {
        return <Postcard post={post} key={post._id} />;
      })}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Home;
