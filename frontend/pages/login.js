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

export default function Login() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { usernameOrEmail, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.id);
      router.push("/");
    } catch (err) {
      setError(err.response?.data.error || "Login failed");
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
            Log In
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
              label="Username or Email"
              variant="outlined"
              size="small"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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
              onClick={handleLogin}
              sx={{ bgcolor: "#1976D2", textTransform: "none" }}
            >
              Log In
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "#555555" }}
          >
            Don't have an account?{" "}
            <MuiLink href="/signup" underline="hover" sx={{ color: "#1976D2" }}>
              Sign Up
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
