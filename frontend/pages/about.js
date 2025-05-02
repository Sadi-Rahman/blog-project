import { Container, Typography, Box, Link as MuiLink } from "@mui/material";
import Navbar from "../components/Navbar";

import Link from "next/link";

export default function About() {
  return (
    <>
      <Navbar onOpen={() => setOpen(true)} />
      <Container maxWidth="md">
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            About Simple Blog
          </Typography>
          <Typography variant="body1" paragraph>
            Simple Blog is a minimalistic blogging platform built with Next.js
            and Material-UI. It allows users to create, read, update, and delete
            blog posts easily. For backend used Node.js and Express.js with
            MySql as the database. The frontend is built using Next.js, a React
            framework that enables server-side rendering and static site
            generation.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
