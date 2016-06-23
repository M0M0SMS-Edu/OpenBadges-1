function addAssertion(badgeName, recipientName, recipientEmail, expirationDate, evidence) {
    var dataSheet = SpreadsheetApp.openById(ScriptProperties.getProperty("test")).getSheetByName("DATA");
    var UIDArray = [dataSheet.getRange(2, 7,dataSheet.getLastRow(), 7)];
    var uid = generateUid(UIDArray);
    var salt = "your salt";
    var name = doHash(recipientName, salt);
    var email = doHash(recipientEmail.trim(), salt);

    dataSheet.appendRow([new Date(), badgeName, name, email, expirationDate, evidence, uid]);
    return uid;
}