function doGet(request) {
    var salt = "pegasus";
    var baseUrl = "https://script.google.com/macros/s/AKfycbwhWomQjaALphGQ1JeSQhfO0VsaZxYBRl-xnEWp328wB4wFlg_T/exec";
    var contentService;

    if (request.parameter.claimcode) {
        var badgeAssertion = buildAssertionJson(request.parameter.claimcode, salt, baseUrl);
        contentService = createContentService(badgeAssertion);
        return contentService;
    } else if (request.parameter.badgename) {
        var badgeClass = buildBadgeJson(request.parameter.badgename, baseUrl);
        if (badgeClass) {
            contentService = createContentService(badgeClass);
            return contentService;
        } else {
            return ContentService.createTextOutput("Badge not found");
        }
    } else {
        return HtmlService.createHtmlOutputFromFile("ui.html")
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    }
}

function doPost(request) {
    return ContentService.createTextOutput("Badges issued.");
}
