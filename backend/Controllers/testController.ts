import { Request, Response } from "express";
import * as testService from "../Services/testService";

export async function getTest(_req: Request, res: Response) {
  try {
    const rows = await testService.getTest();
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function getTestSms(_req: Request, res: Response) {
  try {
    const rows = await testService.getTestSms();
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function getTestPhone(_req: Request, res: Response) {
  try {
    const rows = await testService.getTestPhone();
    res.send(rows);
  } catch (err) {
    console.log(err);
  }
}
