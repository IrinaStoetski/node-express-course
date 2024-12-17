const { people } = require("../data");

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Please provide name value" });
  }

  const newPerson = { id: people.length + 1, name };

  people.push(newPerson);
  res.status(201).json(newPerson);
};

const getPeople = (req, res) => {
  return res.json(people);
};

const getPerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  return res.json(person);
};

module.exports = { addPerson, getPeople, getPerson };
