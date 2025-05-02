## Overview
**Blog** is a full-stack, educational blogging platform built with Next.js, Material UI (MUI), Express.js, and MySQL. It supports: user **registration** and **login** with JWT authentication, **CRUD** operations on posts, per-user **profile pages** for editing and deleting your own posts, and a **responsive**, minimalist UI theme.

## Features
- **User Authentication**: Sign up and log in with unique username and email, secured by bcrypt and JWT.
- **Create & View Posts**: Logged‑in users can create posts; all visitors can view posts listed in reverse chronological order.
- **Per‑User Profiles**: Each user has a profile page displaying only their own posts, with **Edit** and **Delete** actions.
- **Minimalist UI**: A clean, flat design using a limited neutral-and-accent palette for consistency and focus.
- **Responsive & Accessible**: Built with Material UI’s theming and components to ensure accessibility and mobile friendliness.

## Technology Stack
- **Frontend**: Next.js 13, React 18, Material UI v5, Axios for HTTP requests.
- **Backend**: Express.js, mysql2, bcrypt for password hashing, jsonwebtoken for JWTs.
- **Database**: MySQL (via XAMPP), with `users` and `posts` tables and foreign‑key constraints.
