// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db"); // mysql2 connection

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

/** Authentication Middleware **/
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET); // Attach { sub, username }
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

/** --- Public Posts Route --- **/
// List all posts (public, no auth required)
app.get("/api/posts", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT p.id, p.content, p.created_at, p.user_id, u.username
         FROM posts p
         JOIN users u ON p.user_id = u.id
         ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add routes for user profiles and admin functionality

/** --- Public Route: View Another User's Posts --- **/
app.get("/api/users/:id/posts", async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await db
      .promise()
      .query(
        "SELECT id, content, created_at FROM posts WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
      );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/** --- Admin Routes --- **/
app.use("/api/admin", authenticate);

// Admin: View All Posts
app.get("/api/admin/posts", async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const [rows] = await db.promise().query(
      `SELECT p.id, p.content, p.created_at, p.user_id, u.username
         FROM posts p
         JOIN users u ON p.user_id = u.id
         ORDER BY p.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: Delete Any Post
app.delete("/api/admin/posts/:id", async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const postId = req.params.id;
    await db.promise().execute("DELETE FROM posts WHERE id = ?", [postId]);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: Edit Any Post
app.put("/api/admin/posts/:id", async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const postId = req.params.id;
    const { content } = req.body;
    await db
      .promise()
      .execute("UPDATE posts SET content = ? WHERE id = ?", [content, postId]);
    res.json({ message: "Post updated" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/** --- Protected Posts Routes --- **/
app.use("/api/posts", authenticate);

// Get current user’s posts
app.get("/api/posts/user", async (req, res) => {
  try {
    const uid = req.user.sub;
    const [rows] = await db
      .promise()
      .query(
        "SELECT id, content, created_at FROM posts WHERE user_id = ? ORDER BY created_at DESC",
        [uid]
      );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const uid = req.user.sub;
    const { content } = req.body;
    const [result] = await db
      .promise()
      .execute("INSERT INTO posts (user_id, content) VALUES (?, ?)", [
        uid,
        content,
      ]);
    res.json({
      id: result.insertId,
      user_id: uid,
      content,
      created_at: new Date(),
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a post (only owner)
app.put("/api/posts/:id", async (req, res) => {
  try {
    const uid = req.user.sub;
    const postId = req.params.id;
    const { content } = req.body;

    const [[post]] = await db
      .promise()
      .query("SELECT user_id FROM posts WHERE id = ?", [postId]);
    if (!post || post.user_id !== uid) {
      return res.status(403).json({ error: "Not your post" });
    }

    await db
      .promise()
      .execute("UPDATE posts SET content = ? WHERE id = ?", [content, postId]);
    res.json({ message: "Updated" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a post (only owner)
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const uid = req.user.sub;
    const postId = req.params.id;

    const [[post]] = await db
      .promise()
      .query("SELECT user_id FROM posts WHERE id = ?", [postId]);
    if (!post || post.user_id !== uid) {
      return res.status(403).json({ error: "Not your post" });
    }

    await db.promise().execute("DELETE FROM posts WHERE id = ?", [postId]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/** --- Auth Routes --- **/

// Register
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const [result] = await db
      .promise()
      .execute(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, hash]
      );
    res.json({ id: result.insertId, username, email });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username or email in use" });
    }
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const [rows] = await db
      .promise()
      .execute(
        "SELECT id, username, password_hash FROM users WHERE username = ? OR email = ?",
        [usernameOrEmail, usernameOrEmail]
      );
    if (rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.json({ token, username: user.username, id: user.id });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
