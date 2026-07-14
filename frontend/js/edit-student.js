/*==========================================================
                EDIT STUDENT PAGE
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Edit Student Page Loaded Successfully.");

    let currentStatus = "Active";

    // URL-la irundhu id edukkudhu
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        alert("Student ID not found!");
        return;
    }

    // Student details fetch pannudhu
    fetch(`http://localhost:5000/api/students/${id}`)
        .then(response => response.json())
        .then(result => {

            const student = result.data;
            currentStatus = student?.status || "Active";

            document.getElementById("studentId").value = student.student_id;
            document.getElementById("studentName").value = student.full_name;
            document.getElementById("email").value = student.email;
            document.getElementById("phone").value = student.phone;
            document.getElementById("gender").value = student.gender;
            document.getElementById("department").value = student.department;
            document.getElementById("year").value = student.academic_year;
            document.getElementById("dob").value = student.dob.split("T")[0];
            document.getElementById("parentName").value = student.parent_name;
            document.getElementById("parentPhone").value = student.parent_phone;
            document.getElementById("address").value = student.address;

        })
        .catch(error => {
            console.error(error);
            alert("Failed to load student details.");
        });
        // Update Student
document.getElementById("editStudentForm").addEventListener("submit", function(e) {

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
        status: currentStatus
    };

    fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(result => {

        alert(result.message);

        window.location.href = "students.html";

    })
    .catch(error => {

        console.error(error);

        alert("Failed to update student.");

    });

});

});