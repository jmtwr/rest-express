import express from "express";
import jwt from "jsonwebtoken";

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, process.env.JWT_TOKEN as string, (err, payload) => {
      if (payload) {
        console.log(`token ${payload}`)
      }

      next();
    });
  } else {
    next();
  }
}