import { Router } from "express";
import { convertToError } from "../../plugins/Ajv";
import { validateSignIn } from "./userSchemas";

const creds = {
  email: "@1`Email@mail.com",
  password: 1
}

const isValid = validateSignIn(creds);
console.log("valid? ", convertToError(validateSignIn.errors!));

const userRoutes = Router();

userRoutes.post("/sign-in", async (req, res) => {
  res.status(200).send(req.body);

});

export { userRoutes };