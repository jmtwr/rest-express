import { Router } from "express";
import { db } from "../..";
import { LogInCredentials, SignUpReq } from "../../models/User";
import { convertAjvError } from "../../plugins/Ajv";
import { validateSignInBody, validateSignUpBody } from "./userSchemas";

// const isValid = validateSignInBody(creds);
// console.log("valid? ", convertToError(validateSignInBody.errors));
const userRoutes = Router();

userRoutes.post("/sign-in", async (req, res) => {
  const isBodyValid = validateSignInBody(req.body);

  if (isBodyValid) {
    const { email, password } = req.body as LogInCredentials;

  }

  return res.status(401).send(convertAjvError(validateSignInBody.errors));
});

userRoutes.post("/sign-up", async (req, res) => {
  const isBodyValid = validateSignUpBody(req.body);

  if (isBodyValid) {
    const { firstName, lastName, password, email } = req.body as SignUpReq;
    return res.status(201).send(req.body);
  }

  return res.status(401).send(convertAjvError(validateSignUpBody.errors));
});

export { userRoutes };