import { client } from "../db/connection";

export async function getUsers() {
  console.log("!!!");

  try {
    const { rows } = await client.query("SELECT * FROM users");
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  }
}
