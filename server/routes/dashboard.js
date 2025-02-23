import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js'
const router = express.Router();

/**
 * Dashboard Routes
 */
router.get('/dashboard', dashboardController.dashboard);

export default router;