/*==========================================================

Project Name : Student Management System

File Name    : login.js

Description  :
This script handles administrator login validation,
form submission and basic client-side verification.

Author       : Tamil Vanan
Version      : 1.0

==========================================================*/


/*==========================================================
                DOM ELEMENTS
==========================================================*/

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");


/*==========================================================
                LOGIN FORM SUBMIT
==========================================================*/

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    validateLogin();

});


/*==========================================================
                LOGIN VALIDATION
==========================================================*/

function validateLogin() {

    const emailValue = email.value.trim();

    const passwordValue = password.value.trim();

    /*============ EMPTY FIELD CHECK ============*/

    if (emailValue === "" || passwordValue === "") {

        alert("Please fill all the fields.");

        return;

    }

    /*============ EMAIL VALIDATION ============*/

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {

        alert("Please enter a valid email address.");

        email.focus();

        return;

    }

    /*============ PASSWORD VALIDATION ============*/

    if (passwordValue.length < 6) {

        alert("Password must contain at least 6 characters.");

        password.focus();

        return;

    }

    loginSuccess();

}
/*==========================================================
                LOGIN SUCCESS FUNCTION
==========================================================*/

function loginSuccess() {

    /*============ SUCCESS MESSAGE ============*/

    alert("Login Successful! Welcome Administrator.");

    /*============ LOADING EFFECT ============*/

    const loginButton = document.querySelector(".login-btn");

    loginButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

    loginButton.disabled = true;

    /*============ REDIRECT TO DASHBOARD ============*/

    setTimeout(function () {

        window.location.href = "dashboard.html";

    }, 2000);

}


/*==========================================================
                ENTER KEY SUPPORT
==========================================================*/

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        loginForm.requestSubmit();

    }

});


/*==========================================================
                PAGE LOADED
==========================================================*/

window.addEventListener("load", function () {

    console.log("Student Management System Login Loaded Successfully.");

});