import { pool } from "./../../db/connect.js";
import bcrypt from "bcrypt";

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

/**
 * @description Get all users
 * @route GET /users
 */
export async function getUsers(req, res) {
  try {
    const result = await query("SELECT * FROM users");

    if (!result.length)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Get user
 * @route GET /users/:id
 */
export async function getUser(req, res) {
  try {
    const { id } = req.params;

    const result = await query("SELECT * FROM users WHERE id = ?", [id]);

    if (!result.length)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Create user
 * @route POST /users/new
 */
export async function createUser(req, res) {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Krypterar lösenordet
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const result = await query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );
    
    if (result.affectedRows < 1)
      return res.status(400).json({ error: "User not created!" });

    res.status(201).json({ id: result.insertId, message: "User created!" });
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Update user
 * @route PUT /users/:id
 */

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;

    // Krypterar lösenordet
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const result = await query(
      "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?",
      [username, hashedPassword, email, id]
    );

    if(result.affectedRows < 1)
      return res.status(404).json({ error: "User not updated!" });

    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Update user
 * @route DELETE /users/:id
 */

export async function deleteUser(req, res) {

  try {
    const { id } = req.params;

    const result = await query("DELETE FROM users WHERE id = ?", [id]);


    if(result.affectedRows < 1)
        return res.status(404).json({ error: "User not deleted!" });

    res.status(200).json({message: "User deleted!"});

  } catch (error) {

    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
