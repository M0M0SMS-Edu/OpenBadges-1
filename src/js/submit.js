function showError(msg) {
    var formError = document.getElementsByClassName("form-error");
    for (i = formError.length; i--; ) {
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

function securityCheck() {
    var form = document.getElementById("badge-form");
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
    google.script.run.withFailureHandler(function (err) {
        showError("Server error while submitting form: contact administrator");
    }).withSuccessHandler(function (response) {
        if (response) {
            form.submit();
        } else {
            showError("Server error while validating form: check form details");
        }
    }).submitForm(password.value);
}