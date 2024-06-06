import express from "express";
import { body, param } from "express-validator";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();


// Create a new user (POST /users)
router.post("/", createUser);

// Get all users (GET /users)
router.get("/", getUsers);

// Get a user by ID (GET /users/:id)
router.get("/:id", getUserById);

// Update a user by ID (PUT /users/:id)
router.put("/:id", updateUser);

// Delete a user by ID (DELETE /users/:id)
router.delete("/:id", deleteUser);

/*
// Create a new user (POST /users)
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["donor", "requestor", "both"]).withMessage("Invalid user role"),
    body("location").isObject().withMessage("Invalid location format"), // Assuming location is an object
    body("location.latitude").isDecimal().withMessage("Invalid latitude"),
    body("location.longitude").isDecimal().withMessage("Invalid longitude"),
    body("phone").optional().isMobilePhone(), // Optional phone number validation
    body("photo").optional().isURL(), // Optional photo URL validation
  ],
  createUser
);

// Get all users (GET /users)
router.get("/", getUsers);

// Get a user by ID (GET /users/:id)
router.get("/:id", param("id").isMongoId(), getUserById);

// Update a user by ID (PUT /users/:id)
router.put(
  "/:id",
  param("id").isMongoId(),
  [
    body("name").optional().trim().notEmpty().withMessage("Name is required"),
    body("email").optional().isEmail().normalizeEmail().withMessage("Invalid email format"),
    body("password").optional().trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").optional().isIn(["donor", "requestor", "both"]).withMessage("Invalid user role"),
    body("location").optional().isObject().withMessage("Invalid location format"),
    body("location.latitude").optional().isDecimal().withMessage("Invalid latitude"),
    body("location.longitude").optional().isDecimal().withMessage("Invalid longitude"),
    body("phone").optional().isMobilePhone(), // Optional phone number validation
    body("photo").optional().isURL(), // Optional photo URL validation
  ],
  updateUser
);

// Delete a user by ID (DELETE /users/:id)
router.delete("/:id", param("id").isMongoId(), deleteUser);
*/
export default router;