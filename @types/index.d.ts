import { UserTO } from "../src/models/User";
import { Database } from "../src/plugins/db";

declare module 'express-serve-static-core' {
  export interface Request {
    user: UserTO;
    db: Database;
  }
}