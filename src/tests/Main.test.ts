import { DBTestHelper } from "./global/DBTestHelper";
import { testData } from "./TestData";

beforeAll(async () => {
  jest.setTimeout(20000);
  testData.db = await DBTestHelper.initDb();
});

describe("Main test flow", () => {
  test("firts test", (done) => done())
})