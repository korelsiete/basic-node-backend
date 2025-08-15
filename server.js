const http = require("http");

let users = [
  { id: 1, name: "Yasser" },
  { id: 2, name: "Yhamile" },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else if (req.url.startsWith("/users/") && req.method === "GET") {
    const parts = req.url.split("/");
    const id = Number(parts[2]);

    const user = users.find((u) => u.id === id);

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not founded" }));
    }
  } else if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
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
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Url not founded" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
