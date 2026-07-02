/*==========================================================
                ADD STUDENT PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Add Student Page Loaded Successfully.");

    const studentForm = document.getElementById("addStudentForm");

    if (!studentForm) {
        console.log("Form not found!");
        return;
    }

    studentForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const studentData = {
    student_id: document.getElementById("studentId").value,
    full_name: document.getElementById("studentName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value,
    department: document.getElementById("department").value,
    academic_year: document.getElementById("year").value,
    dob: document.getElementById("dob").value,
    parent_name: document.getElementById("parentName").value,
    parent_phone: document.getElementById("parentPhone").value,
    address: document.getElementById("address").value,
    status: "Active"
};

console.table(studentData);
fetch("http://localhost:5000/api/students", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
})
.then((response) => response.json())
.then((data) => {

    console.log(data);

    if (data.success) {

        alert("Student Added Successfully!");

        studentForm.reset();

    } else {

        alert("Failed to Add Student!");

    }

})
.catch((error) => {

    console.error(error);

    alert("Server Error!");

});

    });

});