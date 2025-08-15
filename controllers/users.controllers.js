const users = require("../data/users");

function getUsers(res) {
  res.writeHead(200);
  res.end(JSON.stringify(users));
}

function getUserById(id, res) {
  const user = users.find((u) => u.id === id);

  if (user) {
    res.writeHead(200);
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "User not founded" }));
  }
}

function createUser(body, res) {
  try {
    const newUser = JSON.parse(body);
    newUser.id = users.length ? users.at(-1).id + 1 : 1;
    users.push(newUser);
    res.writeHead(201);
    res.end(JSON.stringify(newUser));
  } catch (error) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: "Invalid JSON" }));
  }
}

function updateUser(id, body, res) {
  try {
    const updateData = JSON.parse(body);
    const index = users.findIndex((u) => u.id === id);

    if (index !== -1) {
      users[index] = { ...users[index], ...updateData };
      res.writeHead(200);
      res.end(JSON.stringify(users[index]));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not founded" }));
    }
  } catch (error) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: "Invalid JSON" }));
  }
}

function deleteUser(id, res) {
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    const deleted = users.splice(index, 1)[0];
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Deleted user", deleted }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "User not founded" }));
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
