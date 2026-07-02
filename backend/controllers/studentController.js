const Student = require("../models/studentModel");

// Get All Students
const getStudents = (req, res) => {

    Student.getAllStudents((err, students) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch students",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });

    });

};
// Add New Student
const addStudent = (req, res) => {

    Student.addStudent(req.body, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to add student",
                error: err
            });

        }

        res.status(201).json({
            success: true,
            message: "Student added successfully"
        });

    });

};

module.exports = {
    getStudents,
    addStudent
};