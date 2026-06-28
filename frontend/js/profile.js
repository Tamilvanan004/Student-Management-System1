/*==========================================================

Project Name : Student Management System

File Name    : profile.js

Description  :
Handles profile page interactions,
form validation,
image preview,
password validation,
and profile update messages.

Author       : Tamil Vanan

Version      : 1.0

==========================================================*/


/*==========================================================
                SELECT HTML ELEMENTS
==========================================================*/

const profileForm =
document.getElementById("profileForm");

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const mobile =
document.getElementById("mobile");

const currentPassword =
document.getElementById("currentPassword");

const newPassword =
document.getElementById("newPassword");

const confirmPassword =
document.getElementById("confirmPassword");

const profileImage =
document.getElementById("profileImage");

const profilePreview =
document.querySelector(".profile-image img");

const about =
document.getElementById("about");


/*==========================================================
                PAGE LOAD
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Administrator Profile Loaded Successfully."
    );

});
/*==========================================================
                FORM VALIDATION
==========================================================*/

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nameValue = fullName.value.trim();

    const emailValue = email.value.trim();

    const mobileValue = mobile.value.trim();

    if (nameValue === "") {

        alert("Full Name is required.");

        fullName.focus();

        return;

    }

    if (nameValue.length < 3) {

        alert("Full Name must contain at least 3 characters.");

        fullName.focus();

        return;

    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {

        alert("Please enter a valid Email Address.");

        email.focus();

        return;

    }

    const mobilePattern =
    /^[6-9][0-9]{9}$/;

    if (!mobilePattern.test(mobileValue)) {

        alert("Please enter a valid 10-digit Mobile Number.");

        mobile.focus();

        return;

    }

    validatePassword();

});
/*==========================================================
                PASSWORD VALIDATION
==========================================================*/

function validatePassword() {

    const currentValue =
    currentPassword.value.trim();

    const newValue =
    newPassword.value.trim();

    const confirmValue =
    confirmPassword.value.trim();

    // User password change panna virumbina mattum validate pannum
    if (
        currentValue !== "" ||
        newValue !== "" ||
        confirmValue !== ""
    ) {

        if (currentValue === "") {

            alert("Please enter your Current Password.");

            currentPassword.focus();

            return;

        }

        if (newValue.length < 8) {

            alert(
                "New Password must contain at least 8 characters."
            );

            newPassword.focus();

            return;

        }

        const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

        if (!passwordPattern.test(newValue)) {

            alert(
                "Password must contain Uppercase, Lowercase and Number."
            );

            newPassword.focus();

            return;

        }

        if (newValue !== confirmValue) {

            alert(
                "New Password and Confirm Password do not match."
            );

            confirmPassword.focus();

            return;

        }

    }

    showSuccessMessage();

}
/*==========================================================
                PROFILE IMAGE PREVIEW
==========================================================*/

if (profileImage) {

    profileImage.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {

            return;

        }

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if (!allowedTypes.includes(file.type)) {

            alert("Please upload only JPG, JPEG or PNG image.");

            profileImage.value = "";

            return;

        }

        const reader = new FileReader();

        reader.onload = function (event) {

            profilePreview.src = event.target.result;

        };

        reader.readAsDataURL(file);

    });

}


/*==========================================================
                ABOUT SECTION CHARACTER COUNTER
==========================================================*/

const maxCharacters = 300;

if (about) {

    about.setAttribute(
        "maxlength",
        maxCharacters
    );

    about.addEventListener("input", function () {

        const remaining =
        maxCharacters - this.value.length;

        console.log(
            `Remaining Characters : ${remaining}`
        );

    });

}


/*==========================================================
                UNSAVED CHANGES WARNING
==========================================================*/

let formChanged = false;

profileForm.addEventListener("input", function () {

    formChanged = true;

});

window.addEventListener("beforeunload", function (event) {

    if (formChanged) {

        event.preventDefault();

        event.returnValue = "";

    }

});
/*==========================================================
                SUCCESS MESSAGE
==========================================================*/

function showSuccessMessage() {

    alert(
        "Profile updated successfully!"
    );

    formChanged = false;

}


/*==========================================================
                RESET CONFIRMATION
==========================================================*/

profileForm.addEventListener("reset", function () {

    setTimeout(function () {

        const confirmReset =
        confirm(
            "Are you sure you want to reset all changes?"
        );

        if (!confirmReset) {

            location.reload();

        }

        formChanged = false;

    }, 100);

});


/*==========================================================
                PAGE INITIALIZATION
==========================================================*/

console.log("--------------------------------");

console.log("Student Management System");

console.log("Administrator Profile Module");

console.log("Version : 1.0");

console.log("Developed by Tamil Vanan");

console.log("--------------------------------");


/*==========================================================
                END OF FILE
==========================================================*/