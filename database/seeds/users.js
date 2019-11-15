exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        { username: "forrest", password: 123 },
        { username: "jordan", password: 123 },
        { username: "len", password: 123 },
        { username: "bayron", password: 123 }
      ]);
    });
};
