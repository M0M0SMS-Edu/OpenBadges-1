function doGet(request) {
    return HtmlService.createHtmlOutputFromFile('ui.html')
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
