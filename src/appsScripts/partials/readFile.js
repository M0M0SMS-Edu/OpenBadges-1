function readFile(form) {
    var badgeName = form.selectedbadge;
    var successCount = 0;
    var failCount = 0;
    var expires = form.expiration;
    var evidence = form.evidence;
    var blob = form.file;
    if (blob) {
        var fileString = blob.getDataAsString();
        var fileArray = fileString.split("\n");
        var uids = [];
        var errorString = "";

        // last element is length property? first is header.
        for (var line = fileArray.length - 1; --line;) {
            var lineArray = fileArray[line].split(",");
            var name = lineArray[0];
            var email = lineArray[1].trim();

            var err = "";
            err += validateInput(name, ["text"]);
            err += validateInput(email, ["email"]);

            if (err) {
                errorString += "Failed to add badge for " + name + ": " + err;
                failCount++;
                Logger.log("name: " + name);
                Logger.log("email: " + email);
            } else {
                var uid = addAssertion(badgeName, name, email, expires, evidence);
                if (!sendEmail(badgeName, name, email, uid)) {
                    failCount++;
                    Logger.log("Failed to send email to recipient with UID: " + uid);
                } else {
                    successCount++;
                }
            }
        }

        if (failCount === 0) {
            return "";
        } else {
            return successCount + " ok, " + failCount + " fail. \n" + errorString;
        }
    } else {
        return "file not found";
    }
}
