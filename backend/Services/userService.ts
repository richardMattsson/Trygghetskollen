import { client } from "../db/connection";
import bcrypt from "bcrypt";

export async function getUsers() {
  try {
    const { rows } = await client.query("SELECT * FROM users");
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function userExist(username: string) {
  const checkSql = "SELECT * FROM users WHERE username = $1";

  const result = await client.query(checkSql, [username]);

  return result;
}

export async function postUser(username: string, password: string) {
  const insertSql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const hashedPassword = await bcrypt.hash(password, 10);

  const insertResult = await client.query(insertSql, [
    username,
    hashedPassword,
  ]);

  const newUser = insertResult.rows[0];

  return newUser;
}

export async function login(username: string) {
  const result = await client.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result;
}

export async function updateUser(
  password: string,
  id: number,
  username: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `
      UPDATE users
      SET username = $1, password = $2
      WHERE id = $3
      RETURNING id, username;
    `;
  const params = [username, hashedPassword, id];

  const result = await client.query(sql, params);

  return result;
}

export async function deleteUser(id: number) {
  try {
    const { rows } = await client.query(
      `DELETE FROM users WHERE id = $1 RETURNING id, username`,
      [id],
    );

    return rows;
  } catch (err) {
    console.error(err);
    return [{ message: "Något gick fel vid borttagning" }];
  }
}
