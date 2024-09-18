const express = require('express');
const AuthController = require('./controllers/authController');
const MetricsController = require('./controllers/metricsController');
const authenticateToken = require('../infrastructure/authMiddleware');
const metricsLimiter = require('../../config/rateLimiter');

const router = express.Router();

// Auth Routes
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', AuthController.login);

// Metrics Routes
/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Health metrics management
 */

/**
 * @swagger
 * /metrics:
 *   post:
 *     summary: Submit health metrics
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               waterIntake:
 *                 type: number
 *               sleep:
 *                 type: number
 *               mood:
 *                 type: string
 *     responses:
 *       200:
 *         description: Metrics saved and feedback returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 feedback:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.post('/metrics', authenticateToken, metricsLimiter, MetricsController.addMetrics);

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get health metrics for the logged-in user
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of health metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   waterIntake:
 *                     type: number
 *                   sleep:
 *                     type: number
 *                   mood:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.get('/metrics', authenticateToken, metricsLimiter, MetricsController.getMetrics);

module.exports = router;
