import { Request, Response } from "express";
import * as testResultService from "../Services/testResultService";

export async function getTestResult(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const rows = await testResultService.getTestResult(Number(id));
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Något gick fel" });
  }
}

export async function postTestResult(req: Request, res: Response) {
  const { id } = req.params;
  const { result } = req.body;
  try {
    const rows = await testResultService.postTestResult(Number(id), result);

    res.send(rows);
  } catch (err) {
    res.send(err);
  }
}
