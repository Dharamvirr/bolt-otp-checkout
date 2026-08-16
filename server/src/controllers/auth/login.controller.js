import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { verifyOtpAndLogin } from '../../services/auth.service.js';

export const loginUser = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

    const user = await verifyOtpAndLogin(email, otp);

    return res.status(200).json(
        new ApiResponse(200, { user }, "Login successful")
    );
});