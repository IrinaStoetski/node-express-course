const express = require("express");
const router = express.Router();
const { addPerson, getPeople } = require("../controllers/people.js");

router.get("/", (req, res) => getPeople(req, res));

router.post("/", (req, res) => addPerson(req, res));

router.get(":id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  return res.json(person);
});

module.exports = router;
