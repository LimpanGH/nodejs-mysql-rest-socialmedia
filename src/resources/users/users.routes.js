import express from "express";

// Import handlers  from users.controller.js
import {getUsers, getUser, createUser, updateUser, deleteUser} from "./users.controllers.js";

const router = express.Router();

// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.


// CRUD for users
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);


export default router;