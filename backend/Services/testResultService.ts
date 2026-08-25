import { client } from "../db/connection";

export async function getTestResult(id: number) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM testResults WHERE user_id = $1;`,
      [id],
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
}

export async function postTestResult(id: number, result: number) {
  try {
    const { rows } = await client.query(
      `INSERT INTO testResults (user_id, result) VALUES ($1, $2) RETURNING *`,
      [id, result],
    );

    return rows;
  } catch (err) {}
}
