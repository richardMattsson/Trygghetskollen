import express, { NextFunction, Request, Response } from "express";
import * as wallPostsController from "../Controllers/wallpostsController";

const router = express.Router();

router.get("/", wallPostsController.getWallposts);
router.post("/", wallPostsController.postWallpost);

export default router;
