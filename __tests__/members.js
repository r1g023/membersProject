const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

//user for register
const testUser = {
  first_name: "test",
  last_name: "test",
  dob: "01/01/1871",
  country: "US",
};

describe("server.js", () => {
  //describe 1 GET /api/users
  describe("GET request for /api/members", () => {
    test("should return a status code of 404  if members not found", async () => {
      const res = await request(server).get("/api/members");
      expect(res.status).toBe(404);
    });
    test("should return json", async () => {
      const res = await request(server).get("/api/members");
      expect(res.type).toBe("application/json");
    });
  });
});
