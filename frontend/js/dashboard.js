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

function dashboardStatistics() {

    const totalStudents = document.getElementById("totalStudents");

    const activeStudents = document.getElementById("activeStudents");

    if (totalStudents) {

        totalStudents.style.color = "#2563eb";

    }

    if (activeStudents) {

        activeStudents.style.color = "#22c55e";

    }

}

dashboardStatistics();


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