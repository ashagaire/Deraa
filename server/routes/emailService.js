const nodemailer = require("nodemailer");
const {createTransport } = require('nodemailer');
require("dotenv").config();

const transporter = createTransport({
  host: "smtp-relay.brevo.com", // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port (587 is common for TLS)
  // secure: false, // Use TLS
  auth: {
    user: "7a779a002@smtp-brevo.com", // Your email address
    pass: process.env.SIB_API_KEY, // Your email password or app password
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: "asha.gaire95@gmail.com",
    to: email ,
    subject: "Email Verification",
    text: "Hello world?",
    html: `<strong>Please verify your email by clicking on the following link:</strong> <a href="${verificationLink}">Verify Email</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }

  // transporter.sendMail(mailoptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Message sent: %s", info.messageId);
  // });

};

const sendPasswordResetEmail = async (email, resetLink) => {
  const emailData = {
    to: [{ email }],
    sender: { email: "noreply@yourdomain.com" },
    subject: "Password Reset",
    htmlContent: `<strong>You requested a password reset. Click on the following link to reset your password:</strong> <a href="${resetLink}">Reset Password</a>`,
  };

  try {
    await apiInstance.sendTransacEmail(emailData);
    console.log("Password reset email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send password reset email.");
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
