// File: frontend/components/BlogList.js

import Link from "next/link";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BlogList({
  posts,
  currentUserId,
  showActions = false,
  onDelete,
  onEdit,
}) {
  return (
    <Box sx={{ mx: "auto", maxWidth: "75%" }}>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2, boxShadow: 6 }}>
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: "primary.main" }}>
            //     {post.username.charAt(0).toUpperCase()}
            //   </Avatar>
            // }
            title={
              <Link href={`/user/${post.user_id}`} passHref>
                <Typography
                  component="a"
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    textDecoration: "none",
                  }}
                >
                  {post.username}
                </Typography>
              </Link>
            }
            subheader={
              <Typography variant="caption" color="text.secondary">
                {new Date(post.created_at).toLocaleString()}
              </Typography>
            }
            action={
              showActions &&
              String(post.user_id) === String(currentUserId) && (
                <Box>
                  <IconButton aria-label="edit" onClick={() => onEdit(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(post.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )
            }
          />

          {/* Post content */}
          <CardContent sx={{ pt: 0 }}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {post.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
