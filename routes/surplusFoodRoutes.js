import express from "express";
import { body, param } from "express-validator";
import {
  createSurplusFood,
  getSurplusFoods,
  getSurplusFoodById,
  updateSurplusFood,
  deleteSurplusFood,
} from "../controllers/surplusFoodController.js";

const router = express.Router();

// Create a new surplus food item (POST /surplus-foods)
router.post(
  "/",
  [
    body("donorId").isMongoId().withMessage("Invalid donor ID"),
    body("foodType").trim().notEmpty().withMessage("Food type is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
    body("expirationDate").isISO8601().withMessage("Invalid expiration date format"),
    body("description").optional().trim(),
    body("photos").optional().isArray().isURL({ each: true }), // Array of photo URLs
  ],
  createSurplusFood
);

// Get all surplus food items (GET /surplus-foods)
router.get("/", getSurplusFoods);

// Get a surplus food item by ID (GET /surplus-foods/:id)
router.get("/:id", param("id").isMongoId(), getSurplusFoodById);

// Update a surplus food item by ID (PUT /surplus-foods/:id)
router.put(
    "/:id",
    param("id").isMongoId(),
    [
      body("donorId").optional().isMongoId().withMessage("Invalid donor ID"),
      body("foodType").optional().trim().notEmpty().withMessage("Food type is required"),
      body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
      body("expirationDate").optional().isISO8601().withMessage("Invalid expiration date format"),
      body("description").optional().trim(),
      body("photos").optional().isArray().isURL({ each: true }), // Array of photo URLs
    ],
    updateSurplusFood
  );
  
  // Delete a surplus food item by ID (DELETE /surplus-foods/:id)
  router.delete("/:id", param("id").isMongoId(), deleteSurplusFood);
  
  export default router;