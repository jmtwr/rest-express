import express from "express";
import jwt from "jsonwebtoken";
import { LogInCredentials, VerifiedLogInCredentials } from "../models/User";

const JWT_TOKEN = process.env.JWT_TOKEN as string;

export const verifyToken = (token: string): VerifiedLogInCredentials | undefined => {
  try {
    return jwt.verify(token, JWT_TOKEN) as VerifiedLogInCredentials;
  } catch (e) {
    return undefined;
  }
}

export const tokenSign = (credentials: LogInCredentials): string => {
  return jwt.sign(credentials, JWT_TOKEN, { expiresIn: "1h" });
}

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    const verifiedCreds = verifyToken(authorization);

    if (verifiedCreds) {

    }

    next();
  }
}
