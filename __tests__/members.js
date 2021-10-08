const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  //this is a JEST hook that will run after all the test in this file have ran
  //closethe database connection before the test runner ends,
  //to prevent any warnings about leaks
  await db.destroy();
});

//user for register
const testUser = {
  first_name: "test",
  last_name: "test",
  dob: "01/01/1871",
  country: "TT", //limit 2 characters
};

describe("GET / members integrations test", () => {
  it("GET list of members /api/members", async () => {
    const res = await request(server).get("/api/members");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.length).toBeGreaterThanOrEqual(1); //or to have length of the array of 1 or more
    expect(res.body[0].country).toBe("MX");
  });

  it("gets a single meber by ID", async () => {
    const res = await request(server).get("/api/members/1");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.id).toBe(1);
  });

  it("returns an error for a member that doesn't exist", async () => {
    const res = await request(server).get("/api/members/100");
    expect(res.statusCode).toBe(401);
  });

  it("creates a new member", async () => {
    const res = await request(server).post("/api/members").send(testUser);
    console.log(res);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.first_name).toBe("test");
  });
});
