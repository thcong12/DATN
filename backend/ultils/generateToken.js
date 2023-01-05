import jwt from "jsonwebtoken";
const generateAccessToken = (id,typeAdmin) => {
  return jwt.sign({ id,typeAdmin }, process.env.JWT_ACCESS, {
    expiresIn: "5m",
  });
};
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
export {generateAccessToken,generateRefreshToken};