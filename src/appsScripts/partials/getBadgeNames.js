function getBadgesAsArrays() {
    var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty("test")).getSheetByName('BADGES');
    // prevent error if no badges
    if (badgeSheet.getLastRow() <= 1) {
        return [];
    }
    var badgesArrays = badgeSheet.getRange(2, 1, badgeSheet.getLastRow() - 1, 4).getValues();
    return badgesArrays;
}

function getBadgeList(col) {
    var badgesArrays = getBadgesAsArrays();
    var badges = [];
    for (var i in badgesArrays) {
        badges.push(badgesArrays[i][col]);
    }
    return badges;
}

function valueExists(value, col) {
    var test = value.trim().toLowerCase();
    var list = getBadgeList(col);
    for (var row in list) {
        if (list[row].trim().toLowerCase() === test) {
            return true;
        }
    }
    return false;
}

function badgeExists(form) {
    var testBadge = [form.badgename, form.badgedesc, form.badgeimage];
    for (var col in testBadge) {
        if (valueExists(testBadge[col], col)) {
            return testBadge[0] + " already exists. ";
        }
    }
    return "";
}
