import express from "express";

// Import handlers  from posts.controller.js
import {getPosts, getPost, getPostsByUser, createPostByUser, updatePost, deletePost} from "./posts.controllers.js";

const router = express.Router();


// GET /posts: Retrieve a list of posts.
// POST /posts: Create a new post.
// GET /posts/{postId}: Retrieve a specific post by ID.
// PUT /posts/{postId}: Update a specific post by ID.
// DELETE /posts/{postId}: Delete a specific post by ID.
// GET /users/{userId}/posts: Retrieve all posts by a specific user.
// POST /users/{userId}/posts: Create a new post for a specific user.

// CRUD for posts
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.get("/users/:userId/posts", getPostsByUser);
router.put("/posts/:id", updatePost);
router.post("/users/:userId/posts", createPostByUser);
router.delete("/posts/:id", deletePost);


export default router;