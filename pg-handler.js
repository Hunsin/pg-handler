"use strict";
var pg = require("pg").native;

let connectStr = "";

exports.config = function(params) {
	connectStr = params;
};

exports.query = function(queryStr, params, callback) {
	if (typeof params === "function") {
		callback = params;
		params = [];
	}

	let results = [];
	pg.connect(connectStr, function(err, client, done) {
		if (err) {
			console.log("PostgreSQL connection ERROR: ", err);
			done();
		}

		let query = client.query(queryStr, params);
		query.on("error", function(error) {
			console.log("Query String SyntaxError: " + error);
		});
		query.on("row", function(row) {
			results.push(row);
		});
		query.on("end", function() {
			done();
			if (typeof callback === "function") {
				callback(results);
			}
			else if (typeof callback != "undefined") {
				console.log("ERROR: callback should be function.");
			}
		});
	});
};