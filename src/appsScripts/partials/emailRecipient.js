function sendEmail(badgename, name, email, uid) {
    var baseUrl = "http://www.ucslearningservices.co.uk/openbadges";
    var url = baseUrl + "?claimcode=" + uid;

    // Compose text for the email
    var emailText = "Hi " + name + ",\n\nCongratulations on obtaining the '" + badgename +
        "' Badge. To claim your badge visit \n\n" + url +
        "\n\nThis open badge is essentially a visual recognition of your learning journey which you can store and display online for others to view." +
        "The badge is stored inside a Mozilla Backpack. To find out how to set up your Mozilla Backpack, please visit http://www.openbadges.org" +
        "\n\nMany Thanks\n\nThe Digital Learning Team (Learning Services)" +
        "\n\nPlease visit our blog for more information on how we are using Open Badges at UCS - http://ucselevate.blogspot.co.uk.";

    // Using the MailApp function of Apps Script to send the email to the person
    MailApp.sendEmail(email, "Claim your Badge - " + badgename + "!", emailText);
    return true;
}

/*
 * If the string is matched in the range provided, returns the row number
 *
 * isMatchInColumn(the range to search through: Range, the string to be matched: String, the col to search: Number)
 * return row match found: Number
 */
function isMatchInColumn(range, match, col) {
    for (var i = range.getLastRow() + 1; --i;) {
        Logger.log(range.getCell(i, col).getValue());
        if (range.getCell(i, col).getValue() === match) {
            return i;
        }
    }
    return false;
}
