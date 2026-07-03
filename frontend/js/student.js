/*==========================================================

Project Name : Student Management System

File Name    : student.js

Description  :
Student Management Page JavaScript

Author       : Tamil Vanan

Version      : 1.0

==========================================================*/


/*==========================================================
                PAGE LOADED
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("Students Page Loaded Successfully.");
    loadStudents();

    initializeSearch();

    initializeDeleteButtons();

    initializeViewButtons();

});


/*==========================================================
                STUDENT SEARCH
==========================================================*/

function initializeSearch() {

    const searchInput = document.getElementById("studentSearch");

    if (!searchInput) {

        return;

    }

    searchInput.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll(".student-table tbody tr");

        rows.forEach(function (row) {

            const text = row.textContent.toLowerCase();

            if (text.includes(filter)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}


/*==========================================================
                DELETE CONFIRMATION
==========================================================*/

function initializeDeleteButtons() {

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id = this.dataset.id;

            const confirmDelete = confirm(
                "Are you sure you want to delete this student?"
            );

            if (!confirmDelete) return;

            fetch(`http://localhost:5000/api/students/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(result => {

                alert(result.message);

                loadStudents();

            })
            .catch(error => {

                console.error(error);

                alert("Failed to delete student.");

            });

        });

    });

}

/*==========================================================
                VIEW STUDENT DETAILS
==========================================================*/

function initializeViewButtons() {

    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = this.closest("tr");

            const columns = row.querySelectorAll("td");

            const studentInfo =
`
Student Details

Student ID : ${columns[0].textContent}
Name       : ${columns[1].textContent}
Gender     : ${columns[2].textContent}
Department : ${columns[3].textContent}
Year       : ${columns[4].textContent}
Email      : ${columns[5].textContent}
Phone      : ${columns[6].textContent}
Status     : ${columns[7].textContent.trim()}
`;

            alert(studentInfo);

        });

    });

}


/*==========================================================
                PAGINATION BUTTONS
==========================================================*/

const pageButtons = document.querySelectorAll(".page-btn");

pageButtons.forEach(function(button){

    button.addEventListener("click", function(){

        pageButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        if(this.textContent.includes("Previous") ||
           this.textContent.includes("Next")){

            return;

        }

        this.classList.add("active");

    });

});


/*==========================================================
                PAGE WELCOME MESSAGE
==========================================================*/

function showWelcomeMessage(){

    console.log("Welcome to Student Management Page!");

}

showWelcomeMessage();


/*==========================================================
                PROJECT INFORMATION
==========================================================*/

console.log("------------------------------------------");

console.log("Student Management System");

console.log("Students Module");

console.log("Frontend : HTML | CSS | JavaScript");

console.log("Backend  : Java Servlet");

console.log("Database : MySQL");

console.log("------------------------------------------");
/*==========================================================
                LOAD STUDENTS FROM API
==========================================================*/

function loadStudents() {

    fetch("http://localhost:5000/api/students")

        .then(response => response.json())

        .then(result => {

            const tableBody = document.getElementById("studentTableBody");

            tableBody.innerHTML = "";

            result.data.forEach(student => {

                tableBody.innerHTML += `
                    <tr>
                        <td>${student.student_id}</td>
                        <td>${student.full_name}</td>
                        <td>${student.gender}</td>
                        <td>${student.department}</td>
                        <td>${student.academic_year}</td>
                        <td>${student.email}</td>
                        <td>${student.phone}</td>
                        <td>${student.status}</td>
                        <td>
    <button class="view-btn" data-id="${student.id}">
        View
    </button>

    <button class="delete-btn" data-id="${student.id}">
        Delete
    </button>
</td>
                    </tr>
                `;

            });
            initializeViewButtons();
            initializeDeleteButtons();

        })

        .catch(error => {

            console.error(error);

        });

}