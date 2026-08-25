import { Request, Response } from "express";
import * as wallpostsService from "../Services/wallpostsService";

export async function getWallposts(_req: Request, res: Response) {
  try {
    const rows = await wallpostsService.getWallposts();
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function postWallpost(req: Request, res: Response) {
  const { sender, comment, rating } = req.body;

  if (!sender || !comment || !rating) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const rows = await wallpostsService.postWallpost(sender, comment, rating);
    res.send(rows);
  } catch (err) {
    res.send(err);
  }
}
