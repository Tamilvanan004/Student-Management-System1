const db = require("../config/db");

// Get All Students
const getAllStudents = (callback) => {
    const sql = "SELECT * FROM students ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, results);
    });
};

module.exports = {
    getAllStudents
};