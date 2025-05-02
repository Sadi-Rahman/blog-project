import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function BlogModal({ open, onClose, onSubmit }) {
  const [content, setContent] = useState(""); // React state :contentReference[oaicite:21]{index=21}

  const handlePost = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Write a blog post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handlePost}>
          Post
        </Button>
      </Box>
    </Modal>
  );
}
