require("dotenv").config({ path: "./server/.env" });
const nodemailer = require("nodemailer");
const { createTransport } = require("nodemailer");

const transporter = createTransport({
  host: "smtp-relay.brevo.com", // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port (587 is common for TLS)
  // secure: false, // Use TLS
  auth: {
    user: "7a779a003@smtp-brevo.com", // Your email address
    pass: process.env.SIB_API_KEY, // Your email password or app password
  },
  debug: true, // Enable debug output
  logger: true, // Log information to console
});

const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: "asha.gaire95@gmail.com",
    to: email,
    subject: "Email Verification",
    text: "Hello world?",
    html: `<strong>Please verify your email by clicking on the following link:</strong> <a href="${verificationLink}">Verify Email</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
};

const sendPasswordResetEmail = async (email, resetLink) => {
  // const emailData = {
  //   to: [{ email }],
  //   sender: { email: "noreply@yourdomain.com" },
  //   subject: "Password Reset",
  //   htmlContent: `<strong>You requested a password reset. Click on the following link to reset your password:</strong> <a href="${resetLink}">Reset Password</a>`,
  // };
  const mailOptions = {
    from: "asha.gaire95@gmail.com",
    to: email,
    subject: "Password Reset",
    html: `<strong>You requested a password reset. Click on the following link to reset your password:</strong>  <a href="${resetLink}">Reset Password</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Could not send password reset email.");
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
