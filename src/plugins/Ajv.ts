import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import { ValidateError } from "../models/ValidateError";

const ajv = new Ajv();
const ajvPlug = addFormats(ajv);

const convertToError = (ajvErr: ErrorObject[]): ValidateError => {
  if (ajvErr.length) {
    return {
      status: "error",
      message: ajvErr[0].message!,
      field: ajvErr[0].instancePath.substring(1),
    }
  }

  return {
    status: "error",
    message: "unhandeled",
    field: "undefined",
  }
}

export { ajvPlug, convertToError }