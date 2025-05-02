import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../utils/api";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");

  const fetchMyPosts = async () => {
    const res = await API.get("/posts/user"); // User-specific posts :contentReference[oaicite:25]{index=25}
    setPosts(res.data);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/posts/${id}`); // Protected delete
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const openEdit = (post) => {
    setEditingId(post.id);
    setDraft(post.content);
  };

  const handleSave = async () => {
    await API.put(`/posts/${editingId}`, { content: draft }); // Protected update :contentReference[oaicite:26]{index=26}
    setEditingId(null);
    setDraft("");
    fetchMyPosts();
  };

  return (
    <>
      <Navbar onOpen={() => setOpen(true)} />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Posts
        </Typography>
        {posts.map((post) => (
          <Box
            key={post.id}
            sx={{
              position: "relative",
              mb: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
            }}
          >
            <Typography>{post.content}</Typography>
            <IconButton
              onClick={() => openEdit(post)}
              sx={{ position: "absolute", top: 8, right: 40 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(post.id)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Modal open={!!editingId} onClose={() => setEditingId(null)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" mb={2}>
              Edit Post
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
