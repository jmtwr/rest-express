import { DBTestHelper } from "./global/DBTestHelper";
import { testData } from "./TestData";

DBTestHelper.afterAll(async () => {
  await testData.db.connection.close();
});

DBTestHelper.beforeAll(async () => {
  testData.db = await DBTestHelper.initDb();
});