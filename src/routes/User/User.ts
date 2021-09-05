import { Router } from "express";
import { db } from "../..";
import { LogInCredentials, SignUpReq } from "../../models/User";
import { convertAjvError } from "../../plugins/Ajv";
import { genHashedPassword } from "../../plugins/Auth";
import { UserSvcLive } from "../../services/UserSvc";
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
  const svc = new UserSvcLive(db);

  if (isBodyValid) {
    const { firstName, lastName, password, email } = req.body as SignUpReq;
    try {
      const hashedPassword = await genHashedPassword(password);
      const userTO = await svc.add({ firstName, lastName: lastName, email, password: hashedPassword });
      res.status(201).send({ user: userTO })
    } catch (e) {
      console.error("sign up new user Error", e);
      return res.status(500).send({ status: "error", message: "email address exists" });
    }
  }

  return res.status(401).send(convertAjvError(validateSignUpBody.errors));
});

export { userRoutes };