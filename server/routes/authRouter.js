import { Router } from "express";
const router = Router();

import * as authController from '../controllers/authController.js'

router.route('/register').post(authController.registerUser); //resiter user
router.route('/login').post(authController.loginUser); //login user

export default router;