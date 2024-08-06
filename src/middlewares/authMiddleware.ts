import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { formatResponse } from "../utils/helpers";

const secretKey = process.env.JWT_SECRET || "your_jwt_secret";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user: any) => {
      if (err) {
        return formatResponse(res, 403, "Forbidden"); // Forbidden
      }
      console.log("verify", user);
      // req.id = user; // TypeScript will now recognize this property
      next();
    });
  } else {
    return formatResponse(res, 401, "Forbidden"); // Unauthorized
  }
};

export default authenticateJWT;
