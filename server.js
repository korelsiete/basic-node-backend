const http = require("http");
const handleUsers = require("./routes/users.routes");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  handleUsers(req, res);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
