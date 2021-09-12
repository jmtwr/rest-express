import { PublicUserTO } from "../../models/User";
import request from "supertest";
import { testData } from "../TestData";

export class UserTests {

  static signUpTest = async () => {
    const res = await request(testData.app)
      .post("/sign-up")
      .send({
        firstName: "testName",
        lastName: "testLastName",
        email: "test@mail.com",
        password: "102030"
      });
    const { token } = res.body;
    expect(typeof token === "string").toBeTruthy();
  }

  static signInTest = async () => {
    const res = await request(testData.app)
      .post("/sign-in")
      .send({
        email: "test@mail.com",
        password: "102030"
      });
    const { token } = res.body;
    testData.token = token;
    expect(typeof token === "string").toBeTruthy();
  }

  static getUser = async () => {
    const res = await request(testData.app)
      .get("/user")
      .set("Authorization", testData.token);
    const user = res.body.user as PublicUserTO;

    expect(user.user_id).toBeDefined();
    expect(user.firstName).toBe("testName");
    expect(user.lastName).toBe("testLastName");
    expect(user.email).toBe("test@mail.com");
  }
}