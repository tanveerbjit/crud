const GET = require('./request/get')
const POST = require("./request/post");
const PUT = require("./request/put");
const DELETER = require("./request/delete");

class Route {
  process_request_method(req, res) {
    switch (req.method) {
      case "GET":
        GET(req, res);
        break;

      case "POST":
        POST(req, res);
        break;

      case "PUT":
        PUT(req, res);
        break;

      case "DELETE":
        DELETER(req, res);
        break;

      default:
        res.statusCode = 400;
        res.write("no response");
        res.end();
        break;
    }
  }
}

module.exports = new Route(); // Export the class itself
