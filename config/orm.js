// Import (require) connection.js
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {
    // Display all burgers in the db.
    selectAll: function(table, cb) {
        var query = "SELECT * FROM ?? ";

        connection.query(query,[table], function(err, result) {
            if (err) throw err;
            
            cb(result);
        });
    },
    // Add a burger to the db.
    insertOne: function(table, cols, vals, cb) {
        var query = "INSERT INTO ?? (??) VALUES (?)";
        connection.query(query, [table, cols, vals], function(err, result){
            if (err) throw err
            console.log(result);
            cb(result);
        });
    },
    // Set burger devoured status to true.
    // Set burger devoured status to true.
    updateOne: function(objColVals, condition, cb) {
        //var query = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition + ";"
        var query = "UPDATE burgers SET ? WHERE ?"; 
  connection.query(query, [objToSql(objColVals), condition],function(err, result) {
            if (err) throw err
            cb(result);
        });
    }
}

// Export the ORM object in module.exports.
module.exports = orm;