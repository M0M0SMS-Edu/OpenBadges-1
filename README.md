# OpenBadge
Open Badges v1.1

https://script.google.com/macros/s/AKfycbwhWomQjaALphGQ1JeSQhfO0VsaZxYBRl-xnEWp328wB4wFlg_T/exec - live system

## Introduction

This project is hosted on Google Apps Scripts. You will need a Google Account to set up your own project. This will allow you to create a Google Sheet
in Google Drive. The code is contained within this sheet so that your Google Drive only need that one file (although you will need to host a few other web
files elsewhere).

## Getting the code

Although the live system is hosted on Google, behind the scenes some of the front end code is generated on a Node.js platform using Gulp. If you are familiar with Node then you are free to:

    git clone https://github.com/SuffolkDLT/OpenBadges
    npm install

Alternatively you can visit the page on github and copy or download the code manually.

See also:

https://github.com/openbadges/openbadges-specification

## Google Spreadsheet Headers

### DATA sheet

* Timestamp
* Badge Name
* Recipient Name
* Recipient Email
* Expiration Date
* Evidence
* Unique ID

### BADGES sheet

* Name
* Description
* Image
* Criteria

It is strongly recommended that you familiarise yourself with the Open Badge v1.1 Specification https://openbadgespec.org/

## Build Instructions

* Create a new Google Spreadsheet
* Enter the headers in the top row (see above). You will need to create a second sheet. Name these sheets DATA and BADGES.
* Go to Tools > Script Editor...
You can now enter in the code for your project, but there are a few more steps before you're ready to go:
* Go to File > Project Properties
* Enter a name for your project (wait a few seconds)
* Select the "Script properties" tab
* Add a new row and enter in a key name for the spreadsheet you have created (default key is "test")
* The value will be the long alpha-numeric string contained in the URL of your spreadsheet
When using SpreadsheetApp.openById you can now enter in the key instead of the long alpha-numeric (if you've used the default "test" then there is no need to change these references)
* Go to Publish
* Execute the app as: Me
* Who has access to the app: Anyone, even anonymous
* Once published, copy the web app URL
* Go back to File > Project Properties : Script properties and add a new key "baseUrl" with the value you just copied
This is also the address that users will need to navigate to when issueing new badges or assertions

### Code

The code that needs to be copied into the Google Apps Script associated with your spreadsheet is contained within the src/appsScripts/partials folder of this repository. You can, if you wish, make your modifications and then rebuild the code by running "gulp build" from the command line. This will generate a new build/base.gs file that contains all the script code required giving you only one file to copy. This method is better for experienced programmers.

In src/appsScripts/partials the files have extension .js to allow intelligent code editors to recognise the code as JavaScript, however in Google Apps Script they will have
an extension of .gs - although the name of the file is not important, for simplicity it is recommended that the file name is the same as the function name or related to the name of the functions within the file.

You will also need the ui.html file in the build/ui.html that should be copied and pasted into ui.html in Google Apps Scripts. The source files for ui.html are in src/js and src/sass as well as the base file src/base.html. Again, all the code is injected into ui.html to make it easier to manage within the Google Apps Scripts environment. SASS is used instead of plain CSS so that standard colours and fonts can be used easily, but you can edit the build/ui.html manually if you want - just note that it will be overwritten if you run "gulp ninja" from the command line.

Those with a technical background may be interested to know that this project is developed on top of a Node.js platform using the Node Package Manager (NPM).

### Additional Requirements
These must be hosted on publicly available URLs as they are required by the badge assertion
* issuerOrganisation.json : this file contains details of the person or company that makes and issues the badges and assertions
* Images to be used for your badges (png format)
* Images to be used for your assertions (these must be baked and are optional - not currently supported)
* Criteria that must be met for being awared a badge
* Evidence of an individual's work in earning a badge (optional)

The final requirement is to set up a target for the emails which are sent to recipients
once they have been issued a badge. This page should make it easy for them to add the badge
to their mozilla backpack or download the baked badge for their own safe-guarding, possibly to
be added to another 3rd party badge repository.

## Limitations

* Unable to POST blobs with form submission, Apps Scripts limitation
* Assumes that first row in CSV is header but has no method to check or give option to user
* No way of reporting if emails have been successfully sent (although you can check the sent mail folder of the associated gmail account)
* Doesn't check if badge has already been issued to recipient
* No way of recording if badge has been claimed by recipient
* Location of data is uncertain, Google Servers likely to be outside EEA (European Economic Area)
* Salt used to hash emails is visible as plain text within code and badge assertion json
* There may be Google account limits on the number of emails that can be sent per day (check your account for details - https://support.google.com/a/answer/166852?hl=en)
* Google returns 503 Service Unavailable if multiple badges are claimed within short space of time (order of minutes)

http://tinyurl.com/zddwq8l/exec?claimcode=8AEF692D

