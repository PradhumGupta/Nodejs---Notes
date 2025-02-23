import express from 'express';
import * as mainController from '../controllers/mainController.js'
const router = express.Router();

/** 
 * App Routes
*/
router.get('/', mainController.homepage);
router.get('/about', mainController.about);

export default router;