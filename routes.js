const fs = require("fs");
const requestHandler = (req, res) => {
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
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        // res.setHeader("Location", "/");
        return res.end();
      });
    });
    // fs.writeFile("message.txt", "DUMMY", (err) => {
    //   res.statusCode = 302;
    //   res.setHeader("Location", "/");
    //   return res.end();
    // });
  }
  //  process.exit()
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My FIrst Page</title></head>");
  res.write("<body><h1>Hello From My node server</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = {
//   handler: requestHandler,
//   someText: "Some Hard Coded Text",
// };

exports.handler = requestHandler;
// exports.handler = "Some Hard coded Text";
