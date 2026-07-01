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

module.exports = {
    getStudents
};