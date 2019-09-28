var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");


var PORT = process.env.PORT || 8080;


var app = express();
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");
app.use("/", routes);

app.listen(PORT, function(){
    console.log("We are using PORT" + PORT);
})