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

    initializeDepartmentFilter();

    initializeYearFilter();

    initializeDeleteButtons();

    initializeViewButtons();

});


/*==========================================================
                STUDENT SEARCH
==========================================================*/


function getCurrentFilters() {

    return {
        search: document.getElementById("studentSearch")?.value || "",
        department: document.getElementById("departmentFilter")?.value || "",
        year: document.getElementById("yearFilter")?.value || ""
    };

}

function initializeSearch() {

    const searchInput = document.getElementById("studentSearch");

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        console.log("Search:", this.value);

        const filters = getCurrentFilters();

        loadStudents(
            this.value,
            filters.department,
            filters.year
        );

    });

}
function initializeDepartmentFilter() {

    const departmentFilter = document.getElementById("departmentFilter");

    if (!departmentFilter) return;

    departmentFilter.addEventListener("change", function () {

        const filters = getCurrentFilters();

        loadStudents(
            filters.search,
            this.value,
            filters.year
        );

    });

}

function initializeYearFilter() {

    const yearFilter = document.getElementById("yearFilter");

    if (!yearFilter) return;

    yearFilter.addEventListener("change", function () {

        const filters = getCurrentFilters();

        loadStudents(
            filters.search,
            filters.department,
            this.value
        );

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

function deduplicateStudents(students) {

    const uniqueStudents = [];

    const seen = new Set();

    students.forEach((student) => {

        const key = student.id ?? student.student_id ?? student.email ?? `${student.full_name || ""}-${student.department || ""}-${student.academic_year || ""}`;

        if (seen.has(key)) {

            return;

        }

        seen.add(key);

        uniqueStudents.push(student);

    });

    return uniqueStudents;

}

/*==========================================================
                LOAD STUDENTS FROM API
==========================================================*/
function loadStudents(search = "", department = "", year = "") {

    const filters = arguments.length === 0
        ? getCurrentFilters()
        : { search, department, year };

    console.log("Department:", filters.department);
    console.log("Year:", filters.year);

    const params = new URLSearchParams();

    if (filters.search) {
        params.append("search", filters.search);
    }

    if (filters.department) {
        params.append("department", filters.department);
    }

    if (filters.year) {
        params.append("year", filters.year);
    }

    fetch(`http://localhost:5000/api/students?${params.toString()}`)
        .then(response => response.json())

        .then(result => {

            console.log(result);

            const tableBody = document.getElementById("studentTableBody");

            const studentList = deduplicateStudents(Array.isArray(result.data) ? result.data : []);

            const countDisplay = document.getElementById("studentCountDisplay");

            const summaryCount = document.getElementById("summaryTotalStudents");

            const summaryActive = document.getElementById("summaryActiveStudents");

            const summaryInactive = document.getElementById("summaryInactiveStudents");

            const activeCount = studentList.filter((student) => {

                return String(student.status || "").toLowerCase() === "active";

            }).length;

            const inactiveCount = studentList.filter((student) => {

                return String(student.status || "").toLowerCase() !== "active";

            }).length;

            if (countDisplay) {

                countDisplay.textContent = `Total Students : ${studentList.length}`;

            }

            if (summaryCount) {

                summaryCount.textContent = studentList.length;

            }

            if (summaryActive) {

                summaryActive.textContent = activeCount;

            }

            if (summaryInactive) {

                summaryInactive.textContent = inactiveCount;

            }

            tableBody.innerHTML = "";

            studentList.forEach(student => {

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

                        <a href="edit-student.html?id=${student.id}" class="edit-btn">
                            Edit
                        </a>

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

