import { app } from "../app";
import { DBTestHelper } from "./global/DBTestHelper";
import { testData } from "./TestData";
import { UserTests } from "./userTests/UserTests";

beforeAll(async () => {
  jest.setTimeout(10000);
  testData.db = await DBTestHelper.initDb();
  testData.app = app;
  testData.app.request.db = testData.db;
});

afterAll(async () => {
  await testData.db.connection.close();
}, 10000)

describe("Main tests flow", () => {
  test("sign up new user", async () => UserTests.signUpTest());
  test("sign in user", async () => UserTests.signInTest());
  test("get user", async () => UserTests.getUser());
})