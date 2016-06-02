function validateValue(value, test) {

    var urlPattern = /^https?\:\/\/[\w/.]+$/;  // start http(s):// then alphanumeric_ followed by a dot
    var pngPattern = /\.png$/;
    var jsonPattern = /\.json$/;
    var csvPattern = /\.csv$/;
    var emailPattern = /\@.*\..*$/;
    var textPattern = /^[A-Za-z\s]+$/;  // Upper or lower case letters, and spaces
    var errorString = "";

    switch (test) {
        case "url":
            Logger.log("checking input against URL rule");
            if (!urlPattern.test(value)) {
                errorString = value + ": Must be valid URL. ";
            }
            break;
        case "png":
            Logger.log("checking input against PNG rule");
            if (!pngPattern.test(value)) {
                errorString = value + ": Image must be of type PNG. ";
            }
            break;
        case "email":
            Logger.log("checking input against Email rule");
            if (!emailPattern.test(value)) {
                errorString = value + ": Not a valid email address, must contain . and @. ";
            }
            break;
        case "json":
            Logger.log("checking input against JSON rule");
            if (!jsonPattern.test(value)) {
                errorString = value + ": Not a valid JSON file. ";
            }
            break;
        case "csv":
            Logger.log("checking input against CSV rule");
            if (!csvPattern.test(value)) {
                errorString = value + ": Not a valid CSV file. ";
            }
            break;
        default:
        case "text":
            Logger.log("checking input against TEXT rule");
            if (!textPattern.test(value)) {
                errorString = value + "Text must contain only letters. ";
            }
        case "empty":
            Logger.log("checking field has input");
            if (value.length === 0) {
                errorString = value + "Field cannot be empty. ";
            }
            break;
    }

    return errorString;
}
