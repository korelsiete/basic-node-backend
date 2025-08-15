const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

function handleUsers(req, res) {
  if (req.url === "/users" && req.method === "GET") {
    getUsers(res);
    return;
  }

  if (req.url.startsWith("/users/") && req.method === "GET") {
    const id = Number(req.url.split("/")[2]);
    getUserById(id, res);
    return;
  }

  if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => createUser(body, res));
    return;
  }

  if (req.url.startsWith("/users/") && req.method === "PUT") {
    const id = Number(req.url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => updateUser(id, body, res));
    return;
  }

  if (req.url.startsWith("/users/") && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);
    deleteUser(id, res);
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Url not founded" }));
}

module.exports = handleUsers;
