import express from "express";
import { body, param } from "express-validator";
import {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

// Create a new collection (POST /collections)
router.post(
  "/",
  [
    body("surplusFoodId").isMongoId().withMessage("Invalid surplus food ID"),
    body("requestorId").isMongoId().withMessage("Invalid requestor ID"),
    body("collectionDate").isISO8601().withMessage("Invalid collection date format"),
    body("collectionTime").trim().notEmpty().withMessage("Collection time is required"),
    body("status").isIn(["pending", "confirmed", "canceled", "completed"]).withMessage("Invalid collection status"),
    body("comments").optional().trim(),
  ],
  createCollection
);

// Get all collections (GET /collections)
router.get("/", getCollections);

// Get a collection by ID (GET /collections/:id)
router.get("/:id", param("id").isMongoId(), getCollectionById);

// Update a collection by ID (PUT /collections/:id)
router.put(
  "/:id",
  param("id").isMongoId(),
  [
    body("surplusFoodId").optional().isMongoId().withMessage("Invalid surplus food ID"),
    body("requestorId").optional().isMongoId().withMessage("Invalid requestor ID"),
    body("collectionDate").optional().isISO8601().withMessage("Invalid collection date format"),
    body("collectionTime").optional().trim().notEmpty().withMessage("Collection time is required"),
    body("status").optional().isIn(["pending", "confirmed", "canceled", "completed"]).withMessage("Invalid collection status"),
    body("comments").optional().trim(),
  ],
  updateCollection
);

// Delete a collection by ID (DELETE /collections/:id)
router.delete("/:id", param("id").isMongoId(), deleteCollection);

export default router;