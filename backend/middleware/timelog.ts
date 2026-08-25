import { NextFunction, Request, Response } from "express";

// middleware that is specific to this router
export const timeLog = (_req: Request, _res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
};
