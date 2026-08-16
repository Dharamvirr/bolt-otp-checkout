import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { checkUserExists } from '../../services/auth.service.js';

export const recognizeUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const exists = await checkUserExists(email);

    return res.status(200).json(
        new ApiResponse(200, { exists }, "Recognition check complete")
    );
});