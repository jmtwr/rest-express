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

export const validateSignInBody = ajvPlug.compile(signInBodySchema);