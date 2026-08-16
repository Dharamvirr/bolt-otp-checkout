import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { createOrder } from '../../services/orders.service.js';

export const submitOrder = asyncHandler(async (req, res) => {
    const { userId, email, phoneNumber, shippingAddress } = req.body;

    if (!email || !phoneNumber || !shippingAddress) {
        throw new ApiError(400, "Email, phone number, and shipping address are required");
    }

    const order = await createOrder(userId, email, phoneNumber, shippingAddress);

    return res.status(201).json(
        new ApiResponse(201, order, "Order placed successfully")
    );
});