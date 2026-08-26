import express from "express";
import * as userController from "../Controllers/userController.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.postUser);
router.post("/login", userController.login);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
