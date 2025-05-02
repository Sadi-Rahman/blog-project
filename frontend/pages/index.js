// frontend/pages/index.js

import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BlogModal from "../components/BlogModal";
import BlogList from "../components/BlogList";
import API from "../utils/api";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  // Grab authentication info
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const currentUserId =
    typeof window !== "undefined" && localStorage.getItem("userId");

  // Fetch all posts (public)
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Only allow creating if logged in
  const handleSubmit = async (content) => {
    if (!token) return; // silently ignore or show a toast
    await API.post("/posts", { content });
    fetchPosts();
  };

  // Delete/edit not used on Home; just placeholders
  const handleDelete = async (id) => {};
  const handleEdit = (post) => {};

  return (
    <>
      <Navbar onOpen={() => token && setOpen(true)} />
      <Container sx={{ mt: 4 }}>
        {/* Only mount the modal if logged in */}
        {token && (
          <BlogModal
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
        <BlogList
          posts={posts}
          currentUserId={currentUserId}
          showActions={false}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Container>
    </>
  );
}
