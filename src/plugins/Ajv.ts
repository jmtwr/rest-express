import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import { ValidateError } from "../models/ValidateError";

const ajv = new Ajv();
const ajvPlug = addFormats(ajv);

const convertAjvError = (ajvErr?: ErrorObject[] | null): ValidateError => {
  if (ajvErr && ajvErr.length) {
    let additionInfo = "";
    if (!ajvErr[0].instancePath.length) {
      const match = ajvErr[0].message!.match(/(['])(?:(?=(\\?))\2.)*?\1/gm);
      additionInfo = match ? match[0].substr(1, match[0].length - 2) : "";
    }
    return {
      status: "error",
      message: ajvErr[0].message!,
      field: ajvErr[0].instancePath.length ? ajvErr[0].instancePath.substring(1) : additionInfo,
    }
  }

  return {
    status: "error",
    message: "unhandeled",
    field: "undefined",
  }
}

export { ajvPlug, convertAjvError }