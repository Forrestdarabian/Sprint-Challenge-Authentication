const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./auth-model.js");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  Users.insert({ username, password: bcrypt.hashSync(password, 8) })
    .then(id => {
      res.status(201).json({ message: "User registered", id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error registering user" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Login Successful!",
          token
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error logging in user" });
    });
});

module.exports = router;
