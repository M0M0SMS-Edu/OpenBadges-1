function doGet(request) {
    var salt = "your salt";
    var baseUrl = ScriptProperties.getProperty("baseUrl");
    var contentService;

    if (request.parameter.claimcode) {
        var badgeAssertion = buildAssertionJson(request.parameter.claimcode, salt, baseUrl);
        contentService = createContentService(badgeAssertion);
        return ContentService.createTextOutput(JSON.stringify(badgeAssertion))
            .setMimeType(ContentService.MimeType.JSON);
    } else if (request.parameter.badgename) {
        var badgeClass = buildBadgeJson(request.parameter.badgename, baseUrl);
        if (badgeClass) {
            contentService = createContentService(badgeClass);
            return ContentService.createTextOutput(JSON.stringify(badgeClass))
                .setMimeType(ContentService.MimeType.JSON);
        } else {
            return ContentService.createTextOutput(testAssertion);
        }
    } else {
        return HtmlService.createHtmlOutputFromFile("ui.html")
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    }
}

function doPost(request) {
    return ContentService.createTextOutput("Badges issued.");
}
