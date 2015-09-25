# pg-handler
A simple Node.js PostgreSQL handler which wraps [node-postgres](https://github.com/brianc/node-postgres) & [node-pg-native](https://github.com/brianc/node-pg-native).

## Usage
Please install node-postgres & node-pg-native first.
`$ npm install pg pg-native`
Clone it, then simply require it in your project
`var db = require("./path/to/pg-handler");`

## Config
Setting your database connection.
`db.config("postgres://username:password@localhost/database");`

## Query
Query PostgreSQL DB
`db.query(queryString, [params, callback(results)]);`

## Example
```
var express = require("express"),
	router = express.Router(),
	db = require("./pg-handler)";

db.config("postgres://username:password@localhost/database");

router.get("/data-with-params", function(req, res) {
	db.query("SELECT $1, $2 FROM table_name", [id, name], function(results) {
		res.json(results);
	});
});

router.get("/data-without-params", function(req, res) {
	db.query("SELECT * FROM table_name", function(results) {
		res.json(results);
	});
});

router.post("/data-no-callback", function(req, res, next) {
	let str = `INSERT INTO table_name
			   VALUES (value1,value2,value3)`;
	db.query(str);
	next();
});
```

## Note
The [`let`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let) statement is an ES6 feature, please make sure your environment is at least v4.X.
Or, you can just change `let` to `var` instead.