import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import BlogList from "../../components/BlogList";
import API from "../../utils/api";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query; // Get user ID from URL
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (id) {
      API.get(`/users/${id}/posts`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("Failed to fetch user posts", err));
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Posts</h1>
        <BlogList posts={posts} showActions={false} />
      </div>
    </>
  );
}
