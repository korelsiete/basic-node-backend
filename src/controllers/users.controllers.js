const users = require("../models/users");

exports.getAllUsers = (req, res) => res.json(users);

exports.getUserById = (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.createUser = (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = { ...users[index], ...req.body };
  res.status(200).json(users[index]);
};

exports.deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deleted = users.splice(index, 1)[0];
  res.json(deleted);
};
