import { Router } from "express";
import { LogInCredentials } from "../../models/User";
import { convertAjvError } from "../../plugins/Ajv";
import { validateSignInBody } from "./userSchemas";

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

export { userRoutes };