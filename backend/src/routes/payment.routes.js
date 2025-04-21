import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', authUser, createOrder);

// Verify payment
router.post('/verify-payment', authUser, verifyPayment);

export default router; 