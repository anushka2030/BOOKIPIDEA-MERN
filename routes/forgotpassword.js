const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config(); // To load environment variables
const bcrypt = require('bcrypt'); // For hashing new passwords

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!email || !email.match(/\S+@\S+\.\S+/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if there's already an active password reset request
    if (user.resetPasswordExpires > Date.now()) {
      return res.status(400).json({ error: 'Password reset request already in process' });
    }

    // Create a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Set up the email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:1000/reset-password/${resetToken}`;

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `Click here to reset your password: ${resetLink}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending email: ', err);
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset link sent.' });
    });
  } catch (error) {
    console.error('Error handling forgot password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validate new password
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password and save it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiration time
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error handling reset password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
