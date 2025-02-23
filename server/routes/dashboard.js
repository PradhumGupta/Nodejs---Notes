import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js'
import { isLoggedIn } from '../middleware/checkAuth.js';
const router = express.Router();

/**
 * Dashboard Routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);

export default router;