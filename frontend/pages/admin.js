import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";
import API from "../utils/api";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/admin/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch posts", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const handleEdit = async (post) => {
    const newContent = prompt("Edit post content:", post.content);
    if (newContent) {
      try {
        await API.put(`/admin/posts/${post.id}`, { content: newContent });
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, content: newContent } : p
          )
        );
      } catch (err) {
        console.error("Failed to edit post", err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Admin Dashboard</h1>
        <BlogList
          posts={posts}
          showActions={true}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}
