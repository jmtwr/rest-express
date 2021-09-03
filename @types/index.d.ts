import { User } from "../src/models/User";

declare module 'express-serve-static-core' {
  export interface Request {
    user: User;
  }
}