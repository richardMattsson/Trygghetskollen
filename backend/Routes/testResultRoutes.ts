import express, { NextFunction, Request, Response } from "express";
import * as testResultController from "../Controllers/testResultController";

const router = express.Router();

router.get("/:id", testResultController.getTestResult);
router.post("/:id", testResultController.postTestResult);

export default router;
