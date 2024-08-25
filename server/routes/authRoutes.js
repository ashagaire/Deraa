const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require("../db");
const { sendVerificationEmail, sendPasswordResetEmail } = require('./emailService');
const { jwtSecret } = require('./config');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: '1h' });
};

// Registration Route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(20).toString('hex');

        const result = await pool.query(
            "INSERT INTO users (email, password, verification_token) VALUES ($1, $2, $3) RETURNING id",
            [email, hashedPassword, verificationToken]
        );

        const userId = result.rows[0].id;

        const verificationLink = `http://${req.headers.host}/auth/verify-email/${verificationToken}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(200).send('Registration successful. Please check your email for verification link. to client side');
        console.log('Registration successful from server.')
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Server error');
    }
});

// Email Verification Route
router.get('/verify-email/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const result = await pool.query(
            "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING id",
            [token]
        );

        if (result.rowCount === 0) {
            return res.status(400).send('Invalid or expired verification token.');
        }

        res.status(200).send('Email verified successfully. You can now log in.');
        console.log("Email verified successfully. You can now log in.from server")
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (result.rowCount === 0) {
            return res.status(400).send('User not found.');
        }

        const user = result.rows[0];

        if (!user.is_verified) {
            return res.status(400).send('Email not verified.');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid credentials.');
        }

        const token = generateToken(user.id);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
});

// Password Reset Request Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (result.rowCount === 0) {
            return res.status(400).send('No account with that email address exists.');
        }

        const user = result.rows[0];
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        await query(
            `UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE user_id = $3`,
            [resetToken, resetPasswordExpires, user.user_id]
        );

        const resetLink = `${process.env.SERVER_URL}/auth/reset-password/${resetToken}`;
        await sendPasswordResetEmail(user.email, resetLink);

        res.status(200).send('Password reset email sent.');
    } catch (error) {
        console.error('Error during password reset request:', error);
        res.status(500).send('Server error');
    }
});

// Password Reset Route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const result = await query(
            `SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()`,
            [token]
        );

        if (result.rowCount === 0) {
            return res.status(400).send('Password reset token is invalid or has expired.');
        }

        const user = result.rows[0];
        const bcryptPassword = await bcrypt.hash(newPassword, salt);
        

        await query(
            `UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE user_id = $2`,
            [bcryptPassword, user.user_id]
        );

        res.status(200).send('Password has been reset successfully.');
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
