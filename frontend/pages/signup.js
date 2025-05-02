// File: frontend/pages/signup.js

import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import API from "../utils/api";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await API.post("/auth/register", { username, email, password });
      router.push("/login");
    } catch (err) {
      setError(err.response?.data.error || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F5F7FA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            maxWidth: 400,
            width: "100%",
            p: 4,
            bgcolor: "#FFFFFF",
            borderRadius: 2,
            boxShadow: 6,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, color: "#212121", fontWeight: 500 }}
          >
            Sign Up
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, color: "#555555" }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              size="medium"
              fullWidth
              onClick={handleSignUp}
              sx={{ bgcolor: "#1976D2", textTransform: "none" }}
            >
              Create Account
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "#555555" }}
          >
            Already have an account?{" "}
            <MuiLink href="/login" underline="hover" sx={{ color: "#1976D2" }}>
              Log In
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
