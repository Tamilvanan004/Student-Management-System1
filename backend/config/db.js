const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_management_db"
});

connection.connect((err) => {
    if (err) {
        console.log("❌ MySQL Connection Failed");
        console.log(err);
        return;
    }

    console.log("✅ Connected to MySQL Database");
});

module.exports = connection;