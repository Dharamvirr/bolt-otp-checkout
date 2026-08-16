import pool from '../../db.js';

export const createOrder = async (userId, email, phoneNumber, shippingAddress) => {
    const query = `
        INSERT INTO orders (user_id, email, phone_number, shipping_address)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    
    const values = [userId || null, email, phoneNumber, shippingAddress];
    const result = await pool.query(query, values);
    return result.rows[0];
};