import express from "express";
import validate from "../middlewares/validate.js";
import { createProductSchema } from "../validators/product.schema.js";
import { mongoIdSchema } from "../validators/common.schema.js";

import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   type: object
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 */

/* GET all products */
router.get("/", getProducts);

/* CREATE product (BODY validation – Day-4) */
router.post(
  "/",
  validate(createProductSchema),   // defaults to body
  createProduct
);

/* DELETE product (PARAM validation – Day-4) */
router.delete(
  "/:id",
  validate(mongoIdSchema, "params"),
  deleteProduct
);

export default router;
