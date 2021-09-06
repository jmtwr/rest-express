import { Database } from "src/plugins/db";

export class TestData {
  db!: Database;
}

export const testData = new TestData();