import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import { sendEmail } from "../services/emailService.js";

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 1000 * 60 * 15;
  await user.save();
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password.</p>
        <p>
          Click the link below:
        </p>
        <a href="${resetUrl}">
          ${resetUrl}
        </a>
        <p>
          This link will expire in 15 minutes.
        </p>
      </div>
    `;
  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    html,
  });
  res.status(200).json({
    success: true,
    message: "Reset email sent successfully",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});
