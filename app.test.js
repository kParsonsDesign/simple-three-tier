import { jest } from '@jest/globals'
import request from "supertest"
import { app } from "./app"


describe("Sample Test", () => {
  test("true === true", () => {
    expect(true).toBe(true);
  })
})

describe("Test the root path", () => {
  // use supertest syntax
  test("Should get response from GET method", async () => {
    return request(app)
      .get("/")
      .expect(200);
  })
})
