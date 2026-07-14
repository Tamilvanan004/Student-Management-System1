const db = require("../config/db");

// Get All Students
const getAllStudents = (search, department, year, callback) => {

let sql = "SELECT * FROM students WHERE 1=1";
let values = [];

// Search Filter
if (search) {

    sql += `
        AND (
            student_id LIKE ?
            OR full_name LIKE ?
        )
    `;

    values.push(`%${search}%`);
    values.push(`%${search}%`);

}

// Department Filter
if (department) {

    sql += " AND department = ?";

    values.push(department);

}

// Year Filter
if (year) {

    sql += " AND academic_year = ?";

    values.push(year);

}

sql += " ORDER BY id DESC";
console.log(sql);
console.log(values);
    db.query(sql, values, (err, results) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, results);

    });

};
// Add New Student
const addStudent = (student, callback) => {

    const sql = `
        INSERT INTO students
        (
            student_id,
            full_name,
            email,
            phone,
            gender,
            department,
            academic_year,
            dob,
            parent_name,
            parent_phone,
            address,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            student.student_id,
            student.full_name,
            student.email,
            student.phone,
            student.gender,
            student.department,
            student.academic_year,
            student.dob,
            student.parent_name,
            student.parent_phone,
            student.address,
            student.status
        ],
        (err, result) => {
            if (err) return callback(err, null);

            callback(null, result);
        }
    );
};

// Delete Student
const deleteStudent = (id, callback) => {

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, result);

    });

};
// Get Student By ID
const getStudentById = (id, callback) => {

    const sql = "SELECT * FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, result[0]);

    });

};
// Update Student
const updateStudent = (id, student, callback) => {

    const sql = `
        UPDATE students
        SET
            student_id = ?,
            full_name = ?,
            email = ?,
            phone = ?,
            gender = ?,
            department = ?,
            academic_year = ?,
            dob = ?,
            parent_name = ?,
            parent_phone = ?,
            address = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            student.student_id,
            student.full_name,
            student.email,
            student.phone,
            student.gender,
            student.department,
            student.academic_year,
            student.dob,
            student.parent_name,
            student.parent_phone,
            student.address,
            student.status,
            id
        ],
        (err, result) => {

            if (err) {
                return callback(err, null);
            }

            callback(null, result);

        }
    );

};
module.exports = {
    getAllStudents,
    addStudent,
    deleteStudent,
    getStudentById,
    updateStudent
};