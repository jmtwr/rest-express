import { Database } from "../plugins/db";
import { PublicUserTO } from "../../src/models/User";
import { Database, Database } from "src/plugins/db";

declare module 'express-serve-static-core' {
  export interface Request {
    user?: PublicUserTO;
    db: Database;
  }
}