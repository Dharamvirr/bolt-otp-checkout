import pool from '../../db.js';
import { ApiError } from '../utils/ApiError.js';

export const createUserAndOtp = async (email, firstName, lastName) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const query = `
        INSERT INTO users (email, first_name, last_name, otp)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) 
        DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, otp = EXCLUDED.otp
        RETURNING id, email, first_name, last_name, otp;
    `;
    
    const result = await pool.query(query, [email.toLowerCase(), firstName, lastName, otp]);
    return result.rows[0];
};

export const checkUserExists = async (email) => {
    const query = 'SELECT id FROM users WHERE email = $1';
    const result = await pool.query(query, [email.toLowerCase()]);
    return result.rowCount > 0;
};

export const verifyOtpAndLogin = async (email, otp) => {
    const query = 'SELECT id, email, first_name, last_name, otp FROM users WHERE email = $1';
    const result = await pool.query(query, [email.toLowerCase()]);

    if (result.rowCount === 0) throw new ApiError(404, "User not found");

    const user = result.rows[0];
    if (user.otp !== otp) throw new ApiError(401, "Invalid OTP");

    // Clear OTP for security
    await pool.query('UPDATE users SET otp = NULL WHERE id = $1', [user.id]);

    delete user.otp; // Remove OTP before returning
    return user;
};