import { client } from "../db/connection";

export async function getWallposts() {
  try {
    const { rows } = await client.query("SELECT * FROM wallPosts;");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

export async function postWallpost(
  sender: string,
  comment: string,
  rating: string,
) {
  try {
    const { rows } = await client.query(
      `INSERT INTO wallPosts (phone_number, free_text, severity) VALUES ($1, $2, $3) RETURNING * `,
      [sender, comment, rating],
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}
