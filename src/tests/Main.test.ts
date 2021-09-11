import { UserEnt } from "../entities/UserEnt";
import { DBTestHelper, initSchema } from "./global/DBTestHelper";
import { testData } from "./TestData";

beforeAll(async () => {
  jest.setTimeout(30000);
  await DBTestHelper.initDb("public");
  // console.log('testdata db', testData.db)
});

afterAll(async () => {
  // await testData.db.connection.close();
}, 30000)

describe("Main test flow", () => {
  test("firts test", async () => {
    expect(1).toBe(1);
    // const user = await testData.db.userRepo.save(Object.assign(new UserEnt(), {
    //   firstName: "dsads",
    //   lastName: "dasdad",
    //   email: "test@mail.com",
    //   password: "102030"
    // }))
  })
})