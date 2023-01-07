const http = require("http");
const routes = require("./routes")

// http.createServer(rqListener);
const server = http.createServer(routes.handler);
// const secondserver = http.createServer(routes.someText)

server.listen(3000);
// secondserver.listen(4000)
