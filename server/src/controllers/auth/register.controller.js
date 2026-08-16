import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { createUserAndOtp } from '../../services/auth.service.js';

export const registerUser = asyncHandler(async (req, res) => {
    const { email, firstName, lastName } = req.body;

    if (!email || !firstName || !lastName) {
        throw new ApiError(400, "Email, first name, and last name are required");
    }

    const user = await createUserAndOtp(email, firstName, lastName);

    return res.status(201).json(
        new ApiResponse(201, user, "Registration successful")
    );
});