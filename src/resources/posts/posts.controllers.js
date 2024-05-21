import { pool } from "./../../db/connect.js";

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

/**
 * @description Get all posts
 * @route GET /posts
 */
export async function getPosts(req, res) {
  try {
    const result = await query("SELECT * FROM posts");

    if (!result.length)
      return res.status(404).json({ message: "No posts found" });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Get post
 * @route GET /posts/:id
 */
export async function getPost(req, res) {
  try {
    const { id } = req.params;

    const result = await query("SELECT * FROM posts WHERE id = ?", [id]);

    if (!result.length)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Get posts by user
 * @route GET /users/:userId/posts
 */

export async function getPostsByUser(req, res) {
    try {
        const { userId } = req.params;
    
        const result = await query("SELECT * FROM posts WHERE userId = ?", [userId]);
    
        if (!result.length)
        return res.status(404).json({ message: "No posts found for this user" });
    
        res.status(200).json(result);
    } catch (error) {
        console.error("Error details:", error);
    
        res.status(500).json({ error: "Database query failed!" });
    }
    
}



/**
 * @description Create post by user
 * @route POST /users/:userId/posts
 */
export async function createPostByUser(req, res) {
  try {

    const { userId } = req.params;

    const { title, content } = req.body;

    const result = await query(
      "INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)",
      [title, content, userId]
    );
    
    if (result.affectedRows < 1)
      return res.status(400).json({ error: "Post not created!" });

    res.status(201).json({ id: result.insertId, message: "Post created!" });
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Update post
 * @route PUT /posts/:id
 */

export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await query(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?",
      [title, content, id]
    );

    if(result.affectedRows < 1)
      return res.status(404).json({ error: "Post not updated!" });

    res.status(200).json({ message: "Post updated!" });
  } catch (error) {
    console.error("Error details:", error);

    res.status(500).json({ error: "Database query failed!" });
  }
}

/**
 * @description Delete post
 * @route DELETE /posts/:id
 */

export async function deletePost(req, res) {

  try {
    const { id } = req.params;

    const result = await query("DELETE FROM posts WHERE id = ?", [id]);


    if(result.affectedRows < 1)
        return res.status(404).json({ error: "Post not deleted!" });

    res.status(200).json({message: "Post deleted!"});

  } catch (error) {

    console.error("Error details:", error);
    res.status(500).json({ error: "Database query failed!" });
  }
}
