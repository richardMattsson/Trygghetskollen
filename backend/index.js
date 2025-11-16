const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { Client } = require("pg");
const app = express();

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/api/users", async (_req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM users;");
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/wallPosts", async (_req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM wallPosts;");
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/test", async (_req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM testQuestion;");
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/test/sms", async (_req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM testQuestion;");
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/test/telefon", async (_req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM testQuestionPhone;");
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/testResults/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await client.query(
    `SELECT * FROM testResults WHERE user_id = $1;`,
    [id]
  );
  res.send(rows);
});

app.post("/api/testResult/:id", async (req, res) => {
  const { result } = req.body;
  const { id } = req.params;
  try {
    const { rows } = await client.query(
      `INSERT INTO testResults (user_id, result) VALUES ($1, $2) RETURNING *`,
      [id, result]
    );

    res.send(rows);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Fyll i både användarnamn och lösenord" });
  }

  if (password.length <= 5) {
    return res
      .status(400)
      .json({ message: "Ditt lösenord måste innehålla mer än 5 tecken" });
  }

  if (username.length <= 5) {
    return res
      .status(400)
      .json({ message: "Ditt användarnamn måste innehålla mer än 5 tecken" });
  }

  const checkSql = "SELECT * FROM users WHERE username = $1";
  const insertSql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const checkResult = await client.query(checkSql, [username]);
    if (checkResult.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Det finns redan ett konto med samma användarnamn" });
    }

    const insertResult = await client.query(insertSql, [username, password]);
    const newUser = insertResult.rows[0];

    res.status(201).json({
      message: "Användare skapad!",
      data: newUser,
    });
  } catch (error) {
    console.error("Fel vid skapande av användare:", error);
    res.status(500).json({ message: "Något gick fel vid skapande" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0 || result.rows[0].password !== password) {
      return res
        .status(401)
        .json({ message: "Fel användarnamn eller lösenord" });
    }

    return res.json({
      user: { id: result.rows[0].id, username: result.rows[0].username },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Något gick fel vid inloggning" });
  }
});

app.post("/api/wallPosts", async (req, res) => {
  const { sender, comment, rating } = req.body;

  if (!sender && !comment && !rating) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const { rows } = await client.query(
      `INSERT INTO wallPosts (phone_number, free_text, severity) VALUES ($1, $2, $3) RETURNING * `,
      [sender, comment, rating]
    );
    res.send(rows);
  } catch (err) {
    res.send(err.message);
  }
});

app.put("/api/update/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Fyll i både användarnamn och lösenord" });
  }

  if (password.length <= 5) {
    return res
      .status(400)
      .json({ message: "Ditt lösenord måste innehålla mer än 5 tecken" });
  }

  if (username.length <= 5) {
    return res
      .status(400)
      .json({ message: "Ditt användarnamn måste innehålla mer än 5 tecken" });
  }

  try {
    const sql = `
      UPDATE users
      SET username = $1, password = $2
      WHERE id = $3
      RETURNING id, username;
    `;
    const params = [username, password, id];

    const result = await client.query(sql, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Användare hittades ej" });
    }

    res
      .status(200)
      .json({ message: "Användare uppdaterad", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Något gick fel vid uppdatering" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await client.query(
      `DELETE FROM users WHERE id = $1 RETURNING id, username`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }

    res.status(200).json({
      message: "Användare raderad",
      data: rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Något gick fel vid borttagning" });
  }
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log(`Redo på port http://localhost:${port}/`);
});
