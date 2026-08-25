import express, { NextFunction, Request, Response } from "express";
import * as userController from "../Controllers/userController.js";

const router = express.Router();

router.get("/", userController.getUsers);

export default router;
