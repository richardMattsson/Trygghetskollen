import { Request, Response } from "express";
import * as userService from "../Services/userService.js";

export async function getUsers(_req: Request, res: Response) {
  try {
    const rows = await userService.getUsers();
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
}
