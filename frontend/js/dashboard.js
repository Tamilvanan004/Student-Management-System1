/*==========================================================

Project Name : Student Management System

File Name    : dashboard.js

Description :
Administrator Dashboard JavaScript

Author : Tamil Vanan

Version : 1.0

==========================================================*/


/*==========================================================
                PAGE LOADED
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("Dashboard Loaded Successfully.");

    animateCards();

    setupLogout();

    setupSystemInfoToggle();

    loadDashboardStudents();

});


/*==========================================================
                CARD ANIMATION
==========================================================*/

function animateCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card, index){

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        setTimeout(function(){

            card.style.transition = "0.5s ease";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 200);

    });

}


/*==========================================================
                LOGOUT BUTTON
==========================================================*/

function setupLogout(){

    const logoutLink = document.querySelector('a[href="index.html"]');

    if(!logoutLink){

        return;

    }

    logoutLink.addEventListener("click", function(event){

        const confirmLogout = confirm("Are you sure you want to logout?");

        if(!confirmLogout){

            event.preventDefault();

        }

    });

}
/*==========================================================
                SEARCH FUNCTION
==========================================================*/

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const searchValue = this.value.toLowerCase();

        console.log("Searching :", searchValue);

        /*
        =====================================================
        Later Backend Integration

        Java + Servlet + MySQL connect pannumbodhu
        student records search pannuvom.

        =====================================================
        */

    });

}


/*==========================================================
                DASHBOARD WELCOME MESSAGE
==========================================================*/

function showWelcomeMessage() {

    console.log("Welcome Administrator!");

}

showWelcomeMessage();


/*==========================================================
                DASHBOARD STATISTICS
==========================================================*/

function dashboardStatistics(totalCount, activeCount) {

    const totalStudents = document.getElementById("totalStudents");

    const activeStudents = document.getElementById("activeStudents");

    if (totalStudents) {

        totalStudents.textContent = totalCount;

        totalStudents.style.color = "#2563eb";

    }

    if (activeStudents) {

        activeStudents.textContent = activeCount;

        activeStudents.style.color = "#22c55e";

    }

}

dashboardStatistics(0, 0);

function loadDashboardStudents() {

    fetch("http://localhost:5000/api/students")
        .then((response) => response.json())
        .then((result) => {

            const students = Array.isArray(result.data) ? result.data : [];

            const uniqueStudents = [];

            const seen = new Set();

            students.forEach((student) => {

                const key = student.id ?? student.student_id ?? student.email;

                if (seen.has(key)) {

                    return;

                }

                seen.add(key);

                uniqueStudents.push(student);

            });

            const activeCount = uniqueStudents.filter((student) => {

                return String(student.status || "")
                    .toLowerCase() === "active";

            }).length;

            dashboardStatistics(uniqueStudents.length, activeCount);

            const courseCount = new Set(uniqueStudents.map((student) => student.department)).size;

            const adminCount = 1;

            const courseCountElement = document.getElementById("courseCount");

            const adminCountElement = document.getElementById("adminCount");

            if (courseCountElement) {

                courseCountElement.textContent = courseCount;

            }

            if (adminCountElement) {

                adminCountElement.textContent = adminCount;

            }

            renderRecentStudents(uniqueStudents.slice(0, 4));

        })
        .catch((error) => {

            console.error("Failed to load dashboard students:", error);

            renderRecentStudents([]);

        });

}

function setupSystemInfoToggle() {

    const toggleButton = document.querySelector(".toggle-info-btn");

    const infoList = document.querySelector(".system-info-card .info-list");

    if (!toggleButton || !infoList) {

        return;

    }

    toggleButton.addEventListener("click", function () {

        const isHidden = infoList.classList.toggle("hidden");

        const icon = this.querySelector("i");

        if (icon) {

            icon.className = isHidden
                ? "fa-solid fa-chevron-down"
                : "fa-solid fa-chevron-up";

        }

        this.setAttribute("aria-expanded", String(!isHidden));

    });

}

function renderRecentStudents(students) {

    const tableBody = document.getElementById("recentStudentsTableBody");

    if (!tableBody) {

        return;

    }

    if (!students.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">No student records found.</td>
            </tr>
        `;

        return;

    }

    tableBody.innerHTML = students.map((student) => {

        const statusText = student.status || "Inactive";

        const statusClass = String(statusText).toLowerCase() === "active" ? "active" : "inactive";

        return `
            <tr>
                <td>${student.student_id || "-"}</td>
                <td>${student.full_name || "-"}</td>
                <td>${student.department || "-"}</td>
                <td>${student.academic_year || "-"}</td>
                <td>
                    <span class="status ${statusClass}">${statusText}</span>
                </td>
            </tr>
        `;

    }).join("");

}


/*==========================================================
                PAGE INFORMATION
==========================================================*/

console.log("------------------------------------------");

console.log("Student Management System");

console.log("Administrator Dashboard");

console.log("Frontend : HTML | CSS | JavaScript");

console.log("Backend  : Java Servlet");

console.log("Database : MySQL");

console.log("------------------------------------------");