import jwt from "jsonwebtoken";

export function generateToken(user: any) {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
export const formatResponse = (
  res: any,
  status: number,
  message: string,
  data?: any
) => {
  if (res.headersSent) {
    console.warn("Headers already sent");
    return;
  }
  return res.status(status).json({
    status,
    message,
    data,
  });
};
