const Student = require("../models/studentModel");

// Get All Students
const getStudents = (req, res) => {

    const search = req.query.search || "";
    const department = req.query.department || "";
    const year = req.query.year || "";

Student.getAllStudents(search, department, year, (err, students) => {

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
    console.log(req.body);

    Student.addStudent(req.body, (err, result) => {

        if (err) {
            console.error(err);
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
// Delete Student
const deleteStudent = (req, res) => {

    const id = req.params.id;

    Student.deleteStudent(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to delete student",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    });

};
// Get Student By ID
const getStudentById = (req, res) => {

    const id = req.params.id;

    Student.getStudentById(id, (err, student) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch student",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            data: student
        });

    });

};
// Update Student
const updateStudent = (req, res) => {

    const id = req.params.id;

    Student.updateStudent(id, req.body, (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Failed to update student",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully"
        });

    });

};
module.exports = {
    getStudents,
    addStudent,
    deleteStudent,
    getStudentById,
    updateStudent
};