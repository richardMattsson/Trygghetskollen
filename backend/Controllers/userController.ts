import { Request, Response } from "express";
import * as userService from "../Services/userService.js";
import bcrypt from "bcrypt";

export async function getUsers(_req: Request, res: Response) {
  try {
    const rows = await userService.getUsers();
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function postUser(req: Request, res: Response) {
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
    const userExist = await userService.userExist(username);

    if (userExist.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Det finns redan ett konto med samma användarnamn" });
    }

    const newUser = await userService.postUser(username, password);

    res.status(201).json({
      message: "Användare skapad!",
      data: newUser,
    });
  } catch (error) {
    console.error("Fel vid skapande av användare:", error);
    res.status(500).json({ message: "Något gick fel vid skapande" });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const result = await userService.login(username);

    const passwordMatch =
      result.rows.length > 0 &&
      (await bcrypt.compare(password, result.rows[0].password));
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Fel användarnamn eller lösenord" });
    }

    return res.json({
      user: { id: result.rows[0].id, username: result.rows[0].username },
    });
  } catch {
    return res.status(500).json({ message: "Något gick fel vid inloggning" });
  }
}

export async function updateUser(req: Request, res: Response) {
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
    const result = await userService.updateUser(password, Number(id), username);

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
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const rows = await userService.deleteUser(Number(id));

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
}
