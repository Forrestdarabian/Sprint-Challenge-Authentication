const request = require("supertest");

const server = require("./server.js");

it("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("GET /", function() {
    it("should return 404", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });

    it("should return HTML formatted response", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch("text/html");
        });
    });

    it("should return an 'api' property with the value 'undefined' inside the body", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.api).toBe(undefined);
        });
    });
  });
});
