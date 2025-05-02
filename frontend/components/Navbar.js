"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar({ onOpen }) {
  const { pathname } = useRouter();
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setToken(localStorage.getItem("token"));
  }, []);

  if (pathname === "/login" || pathname === "/signup") {
    return (
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "grey.800", // Background color
          color: "white", // Text color
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Simple Blog
          </Typography>
          <Button
            component={Link}
            href="/"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "grey.800", // Background color
        color: "white", // Text color
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
          {username ? `Welcome, ${username}` : "Simple Blog"}
        </Typography>

        {!token ? (
          <>
            <Button
              component={Link}
              href="/signup"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Sign Up
            </Button>
            <Button
              component={Link}
              href="/login"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Log In
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              sx={{ textTransform: "none" }}
            >
              Log Out
            </Button>
            <Button
              component={Link}
              href={pathname === "/profile" ? "/" : "/profile"}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              {pathname === "/profile" ? "Home" : "Profile"}
            </Button>
            {pathname !== "/about" && pathname !== "/profile" && (
              <Button
                color="inherit"
                onClick={onOpen}
                sx={{ textTransform: "none" }}
              >
                Create Post
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
