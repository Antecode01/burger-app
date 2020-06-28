const orm = require("../config/orm.js");

const burger = {
  all: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  add: function (cb) {
    orm.insertOne("burgers", columns, values, function (res) {
      cb(res);
    });
  },
  update: function (cb) {
    orm.updateOne("burgers", columnValuesObj, condition, function (res) {
      cb(res);
    });
  },
};

module.exports = burger;
