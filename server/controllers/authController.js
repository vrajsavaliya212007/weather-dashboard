import crypto from "crypto";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import { sendToken } from "../services/tokenService.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }
  const adminExists = await User.exists({
    role: "admin",
  });
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: adminExists ? "user" : "admin",
  });
  const message = adminExists
    ? "Registration Successful"
    : "Registration Successful. First admin account created.";
  sendToken(user, 201, message, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid Email or Password");
  }
  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid Email or Password");
  }
  user.lastLogin = new Date();
  await user.save();
  sendToken(user, 200, "Login Successful", res);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({
    email: normalizedEmail,
  });
  if (!user) {
    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save({
    validateBeforeSave: false,
  });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"SkyCast Pro" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "SkyCast Pro - Password Reset",
    html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 16px;
                    background: #f8fafc;
                ">

                    <h1 style="
                        color: #2563eb;
                        margin-bottom: 10px;
                    ">
                        SkyCast Pro
                    </h1>

                    <h2>
                        Password Reset Request
                    </h2>

                    <p>
                        We received a request to reset
                        your SkyCast Pro password.
                    </p>

                    <p>
                        Click the button below to create
                        a new password.
                    </p>

                    <div style="
                        margin: 30px 0;
                    ">
                        <a
                            href="${resetUrl}"
                            style="
                                display: inline-block;
                                padding: 14px 24px;
                                background: #2563eb;
                                color: white;
                                text-decoration: none;
                                border-radius: 10px;
                                font-weight: bold;
                            "
                        >
                            Reset Password
                        </a>
                    </div>

                    <p>
                        This link will expire in
                        <strong>15 minutes</strong>.
                    </p>

                    <p style="
                        color: #64748b;
                        font-size: 14px;
                    ">
                        If you did not request a password
                        reset, you can safely ignore this email.
                    </p>

                </div>
            `,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({
    success: true,
    message:
      "If an account exists with this email, a password reset link has been sent.",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!token) {
    throw new ApiError(400, "Reset token is required");
  }
  if (!password) {
    throw new ApiError(400, "New password is required");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  }).select("+password");
  if (!user) {
    throw new ApiError(400, "Reset token is invalid or expired");
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully. Please login.",
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Successful",
    });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, city, country, bio } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (name !== undefined) {
    user.name = name.trim();
  }
  if (phone !== undefined) {
    user.phone = phone;
  }
  if (city !== undefined) {
    user.city = city;
  }
  if (country !== undefined) {
    user.country = country;
  }
  if (bio !== undefined) {
    user.bio = bio;
  }
  await user.save();
  const updatedUser = await User.findById(user._id).select("-password");
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user: updatedUser,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters");
  }
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});
