import { ajvPlug } from "../../plugins/Ajv";

const signInBodySchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 }
  },
  required: ["email", "password"],
  additionalProperties: false,
}

const signUpBodySchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 3 },
    lastName: { type: "string", minLength: 3 },
    password: { type: "string", minLength: 6 }
  },
  required: ["email", "password", "firstName", "lastName"],
  additionalProperties: false,
}

export const validateSignInBody = ajvPlug.compile(signInBodySchema);
export const validateSignUpBody = ajvPlug.compile(signUpBodySchema);
