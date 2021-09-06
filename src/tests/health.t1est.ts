import request from "supertest";
import { app } from "../app";

describe("helth route test", () => {
  test("It shoult response the GET method", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).toBe("ok");
  })
});