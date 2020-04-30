var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var routes = require("./routes/index");
var users = require("./routes/users");

var app = express();
var graphqlHTTP = require("express-graphql");
var schema = require("./graphql/projectSchemas");
var cors = require("cors");
var development=require("./config/env/development")
var production=require("./config/env/production")

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);


app.use("*", cors());
app.use(
  "/wohlig",
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
);

//environments
const port = process.env.PORT || 3000;
if(process.env.PORT){
  mongoose.connect(production.mongoUrl, { promiseLibrary: require('bluebird'), useNewUrlParser: true,useUnifiedTopology: true })
  .then(() =>  console.log('connection successfull ,Mongodb connected'))
  .catch((err) => console.error(err));

}else{
  mongoose.connect(development.mongoUrl, { promiseLibrary: require('bluebird'), useNewUrlParser: true,useUnifiedTopology: true })
  .then(() =>  console.log('connection successfull localhost/node-graphql,Mongodb connected'))
  .catch((err) => console.error(err));
}
 app.listen( port, (req, res) => {
  console.log(`Server is running on ${port} port.`);
});
//

module.exports = app;
