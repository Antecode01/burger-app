const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "761456",
    database: "burgers_db"
});

connection.connect((err)=>{
    console.log(`Connected on port ${conn.port}`);
})

module.exports = connection; 