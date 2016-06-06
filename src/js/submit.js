function showError(msg) {
    var formError = document.getElementsByClassName("form-error");
    for (var i = formError.length; i--;) {
        formError[i].innerHTML = msg;
    }
    document.getElementById("create").disabled = false;
    document.getElementById("issue").disabled = false;
}

function submitForm(badgeOnly) {
    document.getElementById("create").disabled = true;
    document.getElementById("issue").disabled = true;

    var selector = document.getElementById("badge-selector");
    var selected = selector.options[selector.selectedIndex].value;


    var errorMsg = "";

    if (selected === "Please choose") {
        errorMsg += "Badge must be selected. ";
    }

    var badgeName = document.getElementById("badge-name").value;
    if (badgeName && badgeName !== selected) {
        errorMsg += "Your new badge is not the selected badge, either select it or clear the new badge form. ";
    } else if (badgeOnly && !badgeName) {
        errorMsg += "No new badge information to create. ";
    }

    if (!badgeOnly) {
        if (!validateRecipient()) {
            errorMsg += "Recipient details must be entered into form or uploaded by CSV file. ";
        }
    }

    if (errorMsg) {
        showError(errorMsg);
        return false;
    } else {
        securityCheck();
    }
}

/* This is a convenience to check the password before submitting, however password must still be checked when form is submitted on the server */
function securityCheck() {
    var password = document.getElementById("password");
    var formError = document.getElementsByClassName("form-error");

    google.script.run.withFailureHandler(function (err) {
        showError("Server error while validating password: contact administrator");
    }).withSuccessHandler(function (response) {
        if (response) {
            sendForm();
        } else {
            showError("Password incorrect");
        }
    }).checkPassword(password.value);
}

function sendForm() {
    var form = document.getElementById("badge-form");
    google.script.run.withFailureHandler(function (err) {
        showError("Server error while submitting form: contact administrator");
    }).withSuccessHandler(function (error) {
        if (!error) {
            form.submit();
        } else {
            showError("Server error: " + error);
        }
    }).submitForm(form);
}
