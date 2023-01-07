const http = require("http");
const fs = require("fs");

function rqListener(req, res) {}

// http.createServer(rqListener);
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='test' name='message' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  //  process.exit()
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My FIrst Page</title></head>");
  res.write("<body><h1>Hello From My node server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
// server.listen(4000)
