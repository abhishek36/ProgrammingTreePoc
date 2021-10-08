let express = require("express");
let database = require("./helper/database");
let bodyParser = require("body-parser");
let path = require("path");
let cors = require("cors");
let dotenv = require("dotenv")
database.initModels();
let app = express();
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

enableCORS(app);
enableStaticFileServer(app, process.env.uploadUrl, '/static');
app.use(cors());

// parse application/json
app.use(bodyParser.json());
database.connect();

function enableCORS(expressInstance) {
  expressInstance.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
  });
}

function enableStaticFileServer(expressInstance, folderName, route) {
  app.use(route, express.static(path.join(__dirname, folderName)));
}
require("./routes/index.routes")(app);

app.listen(process.env.port, () => {
  console.log("App listening on port : ", process.env.port);
});