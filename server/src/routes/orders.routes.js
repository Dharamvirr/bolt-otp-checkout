import { Router } from 'express';
import { submitOrder } from '../controllers/orders/orders.controller.js';

const router = Router();

router.post('/', submitOrder);

export default router;