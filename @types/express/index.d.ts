import { PublicUserTO } from "../../src/models/User";

declare module 'express-serve-static-core' {
  export interface Request {
    user?: PublicUserTO;
  }
}