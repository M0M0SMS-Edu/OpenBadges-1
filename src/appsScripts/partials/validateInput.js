function validateInput(value, array, opt) {
    var errorString = validateValue(value, 'empty');

    if (!errorString) {
        for (test in array) {
            errorString += validateValue(value, array[test]);
        }
    } else if (opt) {
        errorString = "";
    }

    return errorString;
}
