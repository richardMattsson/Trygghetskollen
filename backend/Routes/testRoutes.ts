import express, { NextFunction, Request, Response } from "express";
import * as testController from "../Controllers/testController";

const router = express.Router();

router.get("/", testController.getTest);
router.get("/sms", testController.getTestSms);
router.get("/telefon", testController.getTestPhone);
router.get("/telefon", testController.getTestPhone);

export default router;
