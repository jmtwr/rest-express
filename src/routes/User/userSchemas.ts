import { ajvPlug } from "../../plugins/Ajv";

const signInSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 1 }
  },
  required: ["email", "password"],
  additionalProperties: false,
}

export const validateSignIn = ajvPlug.compile(signInSchema);