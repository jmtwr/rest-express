import { app } from "../app";
import request from "supertest";
import { LogInCredentials } from "../models/User";

const logInCreds: LogInCredentials = {
  email: "test@mail.com",
  password: "102030"
}

describe("userRoutes test", () => {
  test("It sould return token", async () => {
    const { body } = await request(app)
      .post("/sign-in")
      .send(logInCreds)
      .set('Accept', 'application/json')

    console.log(body)
  });
});