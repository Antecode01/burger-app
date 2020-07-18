var connection = require("../config/connection");

function createQmarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Ob.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

const orm = {
  selectAll: function (table, cb) {
    let dbQuery = "SELECT * FROM " + table + ";";
    console.log(q);

    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    var dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") " +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";

    console.log(dbQuery);
    connection.query(dbQuery, vals, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
    var dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: function (table, condition, cb) {
    var dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);

    connection.query(dbQuery, function (err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
};

module.exports = orm;
