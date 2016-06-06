function validateValue(value, test) {
    /*
     * http://image.png
     * http://www.image.png
     * http://www.example.com/image.png
     *
     */
    var urlPattern = /^https?\:\/\/[\w/.]+$/;  // start http(s):// then alphanumeric_ followed by a dot
    var pngPattern = /\.png$/;
    var jsonPattern = /\.json$/;
    var csvPattern = /\.csv$/;
    var emailPattern = /\@.*\..*$/;
    var textPattern = /^[A-Za-z\s]+$/;  // Upper or lower case letters, and spaces
    var errorString = "";

    switch (test) {
        case "url":
            console.log("checking input against URL rule");
            if (!urlPattern.test(value)) {
                errorString = "Must be valid URL. ";
            }
            break;
        case "png":
            console.log("checking input against PNG rule");
            if (!pngPattern.test(value)) {
                errorString = "Image must be of type PNG. ";
            }
            break;
        case "email":
            console.log("checking input against Email rule");
            if (!emailPattern.test(value)) {
                errorString = "Not a valid email address, must contain . and @. ";
            }
            break;
        case "json":
            console.log("checking input against JSON rule");
            if (!jsonPattern.test(value)) {
                errorString = "Not a valid JSON file. ";
            }
            break;
        case "csv":
            console.log("checking input against CSV rule");
            if (!csvPattern.test(value)) {
                errorString = "Not a valid CSV file. ";
            }
            break;
        default:
        case "text":
            console.log("checking input against TEXT rule");
            if (!textPattern.test(value)) {
                errorString = "Text must contain only letters. ";
            }
        case "empty":
            console.log("checking field has input");
            if (value.length === 0) {
                errorString = "Field cannot be empty. ";
            }
            break;
    }

    return errorString;
}

function validateInput(id, array, opt) {
    console.log("validating input " + id);
    var inputField = document.getElementById(id);
    var inputFieldError = document.getElementById(id + "-error");
    var errorString = validateValue(inputField.value, "empty");

    if (!errorString) {
        for (var test in array) {
            errorString += validateValue(inputField.value, array[test]);
        }
    } else if (opt) {
        errorString = "";
    }

    inputFieldError.innerHTML = errorString;
    return errorString.length === 0;
}

function validateBadge() {
    var valid = validateInput("badge-name", ["text"]) &
        validateInput("badge-desc", ["text"]) &
        validateInput("badge-image", ["url", "png"]) &
        validateInput("badge-criteria", ["url"]) &
        validateInput("badge-issuer", ["url", "json"]);

    if (valid) {
        setSelectedBadge();
    }

    return valid;
}

function validateRecipient() {
    var file = document.getElementById("import").value;
    var valid = false;

    if (file) {
        valid = validateInput("import", ["csv"]);
    } else {
        valid = validateInput("recipient-name", ["text"]) &
                validateInput("recipient-email", ["email"]);
    }
    return valid;
}
