function getUidRow(UID, values) {
    for (var row = values.length; row--;) {
        if (values[row][0] === UID) {
            return row + 2;
        }
    }
    return "UID not found";
}
/*
* args claim code as Byte array
*
* returns ContentService
*/
function buildAssertionJson(claimcode, salt, baseUrl) {
    /* Initialising some of these as blank to to keep human readable structure
    * Updated to v1.1
    * Of the three JSON files required, this is the Assertion, the other two need
    * to be available on a public url
    */
    var badgeAssertion = {
        "@context": "https://w3id.org/openbadges/v1",
        "type": "Assertion",
        "id": "",
        "uid": "testID",
        "recipient": {
            "identity": "",
            "type": "email",
            "hashed": true,
            "salt": salt
        },
        "badge": "",
        "verify": {
            "type": "hosted",
            "url": ""
        },
        "issuedOn": "1979-01-01"
    };

    // // To access spreadsheet data we need to get by id (stored by running setup function)
    var response = SpreadsheetApp.openById(ScriptProperties.getProperty("test")).getSheetByName("DATA");

    var UID = claimcode;

    // Find out the row from the UID
    var lastRow = response.getLastRow();
    var values = response.getRange("G2:G" + lastRow).getValues();
    var row = getUidRow(UID, values);
    if (typeof row !== "number") {
        return row;
    }

    var timestamp = response.getRange(row, 1).getValue();
    var badgeName = response.getRange(row, 2).getValue();
    var email = response.getRange(row, 4).getValue();
    var expires = response.getRange(row, 5).getValue();
    var evidence = response.getRange(row, 6).getValue();

    /*
    * Hosted assertion must match assertion passed here (same file so it should) but google urls must be
    * the correct ones that will return a valid JSON file, in other words they must have both the base
    * url and the correct claim code query appended
    */
    badgeAssertion.id = baseUrl + "?claimcode=" + claimcode;
    badgeAssertion.verify.url = badgeAssertion.id;    // presume there is a reason the open badges spec allows these to be different, but for the moment they are the same
    badgeAssertion.uid = UID;
    badgeAssertion.recipient.identity = "sha256$" + email;
    badgeAssertion.issuedOn = Utilities.formatDate(timestamp, "GMT", "yyyy-MM-dd");
    // encode the name to make if safe (e.g. spaces)
    badgeAssertion.badge = baseUrl + "?badgename=" + encodeURIComponent(badgeName);
    // badgeAssertion.image = image;
    if (expires) {
        badgeAssertion.expires = Utilities.formatDate(expires, "GMT", "yyyy-MM-dd");
    }
    if (evidence) {
        badgeAssertion.evidence = evidence;
    }

    return badgeAssertion;
}
