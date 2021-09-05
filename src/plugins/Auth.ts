import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LogInCredentials, VerifiedLogInCredentials } from "../models/User";
import { UserSvcLive } from "../services/UserSvc";
import { db } from "..";

const JWT_TOKEN = process.env.JWT_TOKEN as string;
const SALT = 10;

export const genHashedPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
}

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

export const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const verifiedCreds = verifyToken(authorization);

    if (verifiedCreds) {
      const { email, password, iat, exp } = verifiedCreds;
      const svc = new UserSvcLive(db);
      const notExpired = exp - iat > 0;

      if (notExpired) {
        try {
          const candidate = await svc.find({ name: "email" }, email);

          if (candidate.length) {
            const { password: hashedPass } = candidate[0];
            const isPasswordValid = password === hashedPass;

            if (isPasswordValid) {
              const pubUser = svc.fromEntity(candidate[0]);
              req.user = svc.toPublicTO(pubUser);
            }
          }
        } catch (err) {
          console.log("err", err)
        }
      }
    }
  }
  next();
}