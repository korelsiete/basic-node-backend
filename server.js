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
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "url not founded" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
