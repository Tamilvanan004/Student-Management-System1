const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

// GET All Students
router.get("/", studentController.getStudents);

// GET Student By ID
router.get("/:id", studentController.getStudentById);

// POST Add Student
router.post("/", studentController.addStudent);

// UPDATE Student
router.put("/:id", studentController.updateStudent);

// DELETE Student
router.delete("/:id", studentController.deleteStudent);

module.exports = router;