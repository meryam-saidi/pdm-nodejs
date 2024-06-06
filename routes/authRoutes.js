import express from "express";
import { body, param } from "express-validator";
import {
  login,
} from "../controllers/authController.js";

const router = express.Router();


// Create a new user (POST /users)
router.post("/", login);

export default router;