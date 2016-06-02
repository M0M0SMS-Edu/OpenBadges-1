
function submitForm(form) {
    var errorString = "";
    var uid = "";

    if (!checkPassword(form.password)) {
        return "Server error: Password incorrect. ";
    }

    if (errorString += addNewBadge(form)) {
        return errorString;
    }

    // change logic once badgeExists implemented
    if (!badgeExists(form.selectedbadge)) {
        if (!validateInput(form.file, ['empty'])) {
            errorString += readFile(form);
        } else {
            errorString += validateInput(form.name, ['text']);
            errorString += validateInput(form.email, ['email']);

            errorString += validateInput(form.evidence, ['url'], true);
            // errorString += validateInput(form.expiration, ['date']);    // todo date validation
            if (!errorString) {
                uid = addAssertion(form.selectedbadge, form.name, form.email, form.expiration, form.evidence);
                //if (!emailRecipient(uid)) {
                if (!sendEmail(form.selectedbadge, form.name, form.email, uid)) {
                    errorString += "Unable to email recipient. ";
                }
            }
        }
    }
    
    return errorString;
}

function addNewBadge(form) {  
    var errorString = "";
    
    if (!validateInput(form.badgename, ['empty'])) {
        errorString += validateInput(form.badgename, ['text']);
        errorString += validateInput(form.badgedesc, ['text']);
        errorString += validateInput(form.badgeimage, ['url', 'png']);
        errorString += validateInput(form.badgecriteria, ['url']);
        errorString += validateInput(form.badgeissuer, ['url', 'json']);
        if (badgeExists(form.badgename)) {
            errorString += "Badge already exists, choose a different name. ";
        }
        
        if (!errorString) {
            var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('BADGES');  
            badgeSheet.appendRow([form.badgename, form.badgedesc, form.badgeimage, form.badgecriteria, form.badgeissuer]);
        } else {
            return errorString;
        }
    } else {
        return errorString;     // should be empty in this case
    }
}
