import { Database } from "src/plugins/db";
import { Express } from "express";

export class TestData {
  db!: Database;
  app!: Express;
  token!: string;
}

export const testData = new TestData();