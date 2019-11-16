const db = require("../database/dbConfig.js");

const { insert } = require("./auth-model.js");

describe("users model", function() {
  describe("insert()", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should insert a user", async function() {
      await insert({ username: "forrest", password: 123 });

      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("should insert the provided user", async function() {
      await insert({ username: "forrest", password: 123 });
      await insert({ username: "ronny", password: 123 });

      const users = await db("users");

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe("forrest");
      expect(users[1].username).toBe("ronny");
    });
  });
});
