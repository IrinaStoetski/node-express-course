const jwt = require("jsonwebtoken");

const logon = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new Error("Please provide email and password");
  }

  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({ token });
};

const hello = async (req, res) => {
  res
    .status(200)
    .json({ message: `Hello, ${req.user.name} you are authorized` });
};

module.exports = {
  logon,
  hello,
};
