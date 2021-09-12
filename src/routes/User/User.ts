import { Router } from "express";
import { LogInCredentials, SignUpReq } from "../../models/User";
import { convertAjvError } from "../../plugins/Ajv";
import { comparePassword, genHashedPassword, tokenSign } from "../../plugins/Auth";
import { UserSvcLive } from "../../services/UserSvc";
import { validateSignInBody, validateSignUpBody } from "./userSchemas";

const authRoutes = Router();

authRoutes.get("/user", (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).send({ status: "error", message: "unauthorize" });
  }
  return res.status(200).send({ user })
});

authRoutes.post("/sign-in", async (req, res) => {
  const isBodyValid = validateSignInBody(req.body);
  const db = req.db;

  if (isBodyValid) {
    const svc = new UserSvcLive(db);
    const { email, password } = req.body as LogInCredentials;
    try {
      const candidate = await svc.find({ name: "email" }, email);

      if (candidate.length) {
        const { email: uEmail, password: hashedPass } = candidate[0];
        const isPasswordValid = await comparePassword(password, hashedPass);

        if (isPasswordValid) {
          const token = tokenSign({ email: uEmail, password: hashedPass });
          return res.status(200).send({ token })
        }
        return res.status(500).send({ status: "error", message: "wrong credentials" });
      }
    } catch (err) {
      console.log("user not found", err);
    }
  }

  return res.status(401).send(convertAjvError(validateSignInBody.errors));
});

authRoutes.post("/sign-up", async (req, res) => {
  const isBodyValid = validateSignUpBody(req.body);
  const db = req.db;
  const svc = new UserSvcLive(db);

  if (isBodyValid) {
    const { firstName, lastName, password, email } = req.body as SignUpReq;
    try {
      const hashedPassword = await genHashedPassword(password);
      const userTO = await svc.add({ firstName, lastName: lastName, email, password: hashedPassword });
      const token = tokenSign({ email: userTO.email, password: hashedPassword });
      return res.status(201).send({ token });
    } catch (e) {
      console.error("sign up new user Error", e);
      return res.status(500).send({ status: "error", message: "email address exists" });
    }
  }

  return res.status(401).send(convertAjvError(validateSignUpBody.errors));
});

export { authRoutes };