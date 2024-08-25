const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const pool = require("../db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("./emailService");
require("dotenv").config();

//Register Route
router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)
    const { username, email, password } = req.body;

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    //1. check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // 1. If user exists and is not verified, resend verification email
    if (user.rows.length !== 0) {
      if (!user.is_verified && user.verification_token) {
        //1. Bcrypt the user's new password
        const newBcryptPassword = await bcrypt.hash(password, salt);

        //2. Generate new verification token (if needed)
        const newVerificationToken = crypto.randomBytes(20).toString("hex");

        //3. Update user with new verification token
        const newUser = await pool.query(
          "UPDATE users SET username = $1 , password_hash= $2 ,verification_token = $3 WHERE email = $4",
          [username, newBcryptPassword, newVerificationToken, email]
        );

        //4. Send new verification email
        const newVerificationLink = `${process.env.SERVER_URL}/auth/redirect-to-verification/${newVerificationToken}`;
        await sendVerificationEmail(email, newVerificationLink);

        return res
          .status(200)
          .send(
            "Verification email is sent again, please verify user account."
          );
      } else {
        // User already verified or no verification token (handle as needed)
        return res.status(401).send("User already exists. Please Log in.");
      }
    }

    //2. Bcrypt the user password
    const bcryptPassword = await bcrypt.hash(password, salt);

    //3. generate verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");

    //4. enter the new user inside database

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password_hash, verification_token) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, bcryptPassword, verificationToken]
    );

    //5. send email verification link
    const verificationLink = `${process.env.SERVER_URL}/auth/redirect-to-verification/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    res
      .status(200)
      .send(
        "Registration successful. Please check your email for verification link. from server"
      );
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Redirect route to handle email verification redirection
router.get("/redirect-to-verification/:token", (req, res) => {
  const { token } = req.params;
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
  res.redirect(verificationLink);
});

// Email Verification Route
router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const result = await pool.query(
      "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING *",
      [token]
    );

    if (result.rowCount === 0) {
      return res
        .status(400)
        .send("Invalid or expired verification token. Please register again");
    }

    res.status(200).send("Email verified successfully. You can now log in.");
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

// Password Reset Request Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rowCount === 0) {
      return res.status(400).send("No account with that email address exists.");
    }

    const user = result.rows[0];
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await pool.query(
      `UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE user_id = $3`,
      [resetToken, resetPasswordExpires, user.user_id]
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);

    res.status(200).send("Password reset email sent.");
  } catch (error) {
    console.error("Error during password reset request:", error);
    res.status(500).send("Server error");
  }
});

// Password Reset Route
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);

  console.log("from reset password route");
  try {
    console.log(req.body);
    const result = await pool.query(
      `SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()`,
      [token]
    );

    if (result.rowCount === 0) {
      return res
        .status(400)
        .send("Password reset token is invalid or has expired.");
    }

    const user = result.rows[0];
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    await pool.query(
      `UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE user_id = $2`,
      [bcryptPassword, user.user_id]
    );

    res.status(200).send("Password has been reset successfully.");
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).send("Server error");
  }
});

//Login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)
    const { email, password } = req.body;

    //2. check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send("Email not found");
    }

    //check if email is verified
    const currentUser = user.rows[0];
    if (!currentUser.is_verified) {
      return res.status(400).send("Email not verified.");
    }

    //3. check if incomming password is the same in the database password
    const validPassword = await bcrypt.compare(
      password,
      currentUser.password_hash
    );
    if (!validPassword) {
      return res.status(401).send("Incorrect password, please try again.");
    }

    //4. give them jwt token
    const token = jwtGenerator(currentUser.user_id);
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server Error");
  }
});

//Authorization route
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
