import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      id: userId.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
};

export const sendToken = (user, statusCode, message, res) => {
  const token = generateAccessToken(user._id);

  const safeUser = user.toObject ? user.toObject() : { ...user };

  delete safeUser.password;

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    })
    .json({
      success: true,
      message,
      user: safeUser,
    });
};
