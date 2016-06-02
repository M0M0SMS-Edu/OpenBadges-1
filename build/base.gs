function addAssertion(badgeName, recipientName, recipientEmail, expirationDate, evidence) {
    var dataSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('DATA');
    var UIDArray = [dataSheet.getRange(2, 7,dataSheet.getLastRow(), 7)];
    var uid = generateUid(UIDArray);
    var salt = "ucs";
    var name = doHash(recipientName, salt);
    var email = doHash(recipientEmail.trim(), salt);
    
    dataSheet.appendRow([new Date(), badgeName, name, email, expirationDate, evidence, uid]);
    return uid;
}
function badgeExists() {
    // todo
    return false;
}

function checkPassword(password) {
    /*
    CryptoJS v3.1.2
    code.google.com/p/crypto-js
    (c) 2009-2013 by Jeff Mott. All rights reserved.
    code.google.com/p/crypto-js/wiki/License
    */
    var CryptoJS=CryptoJS||function(g,j){var e={},d=e.lib={},m=function(){},n=d.Base={extend:function(a){m.prototype=this;var c=new m;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    q=d.WordArray=n.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=j?c:4*a.length},toString:function(a){return(a||l).stringify(this)},concat:function(a){var c=this.words,p=a.words,f=this.sigBytes;a=a.sigBytes;this.clamp();if(f%4)for(var b=0;b<a;b++)c[f+b>>>2]|=(p[b>>>2]>>>24-8*(b%4)&255)<<24-8*((f+b)%4);else if(65535<p.length)for(b=0;b<a;b+=4)c[f+b>>>2]=p[b>>>2];else c.push.apply(c,p);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
    32-8*(c%4);a.length=g.ceil(c/4)},clone:function(){var a=n.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*g.random()|0);return new q.init(c,a)}}),b=e.enc={},l=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++){var d=c[f>>>2]>>>24-8*(f%4)&255;b.push((d>>>4).toString(16));b.push((d&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f+=2)b[f>>>3]|=parseInt(a.substr(f,
    2),16)<<24-4*(f%8);return new q.init(b,c/2)}},k=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++)b.push(String.fromCharCode(c[f>>>2]>>>24-8*(f%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f++)b[f>>>2]|=(a.charCodeAt(f)&255)<<24-8*(f%4);return new q.init(b,c)}},h=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
    u=d.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=h.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,d=b.words,f=b.sigBytes,l=this.blockSize,e=f/(4*l),e=a?g.ceil(e):g.max((e|0)-this._minBufferSize,0);a=e*l;f=g.min(4*a,f);if(a){for(var h=0;h<a;h+=l)this._doProcessBlock(d,h);h=d.splice(0,a);b.sigBytes-=f}return new q.init(h,f)},clone:function(){var a=n.clone.call(this);
    a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=u.extend({cfg:n.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new w.HMAC.init(a,
    d)).finalize(b)}}});var w=e.algo={};return e}(Math);
    (function(){var g=CryptoJS,j=g.lib,e=j.WordArray,d=j.Hasher,m=[],j=g.algo.SHA1=d.extend({_doReset:function(){this._hash=new e.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(d,e){for(var b=this._hash.words,l=b[0],k=b[1],h=b[2],g=b[3],j=b[4],a=0;80>a;a++){if(16>a)m[a]=d[e+a]|0;else{var c=m[a-3]^m[a-8]^m[a-14]^m[a-16];m[a]=c<<1|c>>>31}c=(l<<5|l>>>27)+j+m[a];c=20>a?c+((k&h|~k&g)+1518500249):40>a?c+((k^h^g)+1859775393):60>a?c+((k&h|k&g|h&g)-1894007588):c+((k^h^
    g)-899497514);j=g;g=h;h=k<<30|k>>>2;k=l;l=c}b[0]=b[0]+l|0;b[1]=b[1]+k|0;b[2]=b[2]+h|0;b[3]=b[3]+g|0;b[4]=b[4]+j|0},_doFinalize:function(){var d=this._data,e=d.words,b=8*this._nDataBytes,l=8*d.sigBytes;e[l>>>5]|=128<<24-l%32;e[(l+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(l+64>>>9<<4)+15]=b;d.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=d.clone.call(this);e._hash=this._hash.clone();return e}});g.SHA1=d._createHelper(j);g.HmacSHA1=d._createHmacHelper(j)})();
    (function(){var g=CryptoJS,j=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(e,d){e=this._hasher=new e.init;"string"==typeof d&&(d=j.parse(d));var g=e.blockSize,n=4*g;d.sigBytes>n&&(d=e.finalize(d));d.clamp();for(var q=this._oKey=d.clone(),b=this._iKey=d.clone(),l=q.words,k=b.words,h=0;h<g;h++)l[h]^=1549556828,k[h]^=909522486;q.sigBytes=b.sigBytes=n;this.reset()},reset:function(){var e=this._hasher;e.reset();e.update(this._iKey)},update:function(e){this._hasher.update(e);return this},finalize:function(e){var d=
    this._hasher;e=d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e))}})})();
    (function(){var g=CryptoJS,j=g.lib,e=j.Base,d=j.WordArray,j=g.algo,m=j.HMAC,n=j.PBKDF2=e.extend({cfg:e.extend({keySize:4,hasher:j.SHA1,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(e,b){for(var g=this.cfg,k=m.create(g.hasher,e),h=d.create(),j=d.create([1]),n=h.words,a=j.words,c=g.keySize,g=g.iterations;n.length<c;){var p=k.update(b).finalize(j);k.reset();for(var f=p.words,v=f.length,s=p,t=1;t<g;t++){s=k.finalize(s);k.reset();for(var x=s.words,r=0;r<v;r++)f[r]^=x[r]}h.concat(p);
    a[0]++}h.sigBytes=4*c;return h}});g.PBKDF2=function(d,b,e){return n.create(e).compute(d,b)}})();
    
    function doCheck(password) {
        var salt = "Suffolk";
        var key512Bits1000Iterations = CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: 50 });
        var hash = "0ec8e829ba5b05b9e96680c571a1cb40d02584a51f47e23a36f433354e409fde2a2838b0ca60b624eaa5070a5348e3c28cc2f93115ac5d1a01fbea893bb1ba60";

        return (key512Bits1000Iterations.toString() === hash);
    }
    
    return doCheck(password);
}


// Based on https://github.com/mozilla/openbadges/wiki/How-to-hash-&-salt-in-various-languages.
// No Edits Necessary
function doHash(input, salt) {
    /*
    CryptoJS v3.1.2
    code.google.com/p/crypto-js
    (c) 2009-2013 by Jeff Mott. All rights reserved.
    code.google.com/p/crypto-js/wiki/License
    */
    var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
    32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
    2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
    x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
    a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
    d)).finalize(c)}}});var w=f.algo={};return f}(Math);
    (function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
    c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
    d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);
  
    var result = CryptoJS.SHA256(input+salt).toString();
    return result;
}

// This function must be setup as a trigger --> emailRecipient --> Spreadsheet --> On form submit
// Function pulls information out of the submitted form and emails the recipient a URL to claim their badge.

function emailRecipient(uid) {
  // Next two lines used to get last row number (might fail on simultanious form submits)
  var sheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName("DATA");
  var range = sheet.getDataRange();
  
  var row = isMatchInColumn(range, uid, 7);
  if (!row) {
    Logger.log("No match found");
    return false;
  }
    
  // Next 4 lines read the form values submitted
  var rowData = sheet.getRange(row, 1, row, 7);
  // var timestamp = rowData.getCell(1, 1).getValue();
  var badgename = rowData.getCell(1, 2).getValue();
  var name = rowData.getCell(1, 3).getValue();
  var email = rowData.getCell(1, 4).getValue();
 
  var claim_code = [];
  
  // This is where the Issuer Gadget is hosted
  // var baseUrl = "https://sites.google.com/site/badgetest1234/";
  var baseUrl = "http://www.ucslearningservices.co.uk/openbadges";
  
  // The claim code holds the row number and the type pf badge, which for now is a static &type=openbadge as the 2nd variable isn't used
  var claim_code_base = "uniqueid=" + uid;
  claim_code.push(Utilities.base64Encode(claim_code_base + "&type=openbadge"));
  
  // Build the URL to send
  var url = baseUrl + "?claim_code=" + claim_code;
  
  // Compose text for the email
  var emailText = "Hi "+name+",\n\nCongratulations on obtaining the '" + badgename + 
    "' Badge. To claim your badge visit \n\n" + url + 
      "\n\nThis open badge is essentially a visual recognition of your learning journey which you can store and display online for others to view." +  
        "The badge is stored inside a Mozilla Backpack. To find out how to set up your Mozilla Backpack, please visit http://www.openbadges.org" + 
          "\n\nMany Thanks\n\nThe Digital Learning Team (Learning Services)" + 
            "\n\nPlease visit our blog for more information on how we are using Open Badges at UCS - http://ucselevate.blogspot.co.uk.";
  
  // Using the MailApp function of Apps Script to send the email to the person
  MailApp.sendEmail(email, "Claim your Badge - " + badgename + "!", emailText);
  return true;
}

function sendEmail(badgename, name, email, uid) {
    var baseUrl = "http://www.ucslearningservices.co.uk/openbadges";
    var url = baseUrl + "?claimcode=" + uid;
    
    // Compose text for the email
    var emailText = "Hi "+name+",\n\nCongratulations on obtaining the '" + badgename + 
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
  for (var i = range.getLastRow() + 1; --i; ) {
    Logger.log(range.getCell(i, col).getValue());
    if (range.getCell(i, col).getValue() === match) {
      return i;
    }
  }
  return false;
}

function generateUid(testArray) {
  var uid = genRandomString(8,16);
    for (var i = testArray.length; i--; ) {
      if (uid === testArray[i]) {
        i = testArray.length;  // restart loop
        uid = genRandomString(8,16);
      }
    }
  return uid;
}

// With thanks to 'thoughtcrime' on StackOverFlow - http://stackoverflow.com/questions/22079353/write-a-unique-code-when-submit-google-form-script
// Function for generating a random 8 character string to use as a unique ID.
// No Edits Necessary

function genRandomString(len, bits){
  bits = bits || 36;
  var outStr = "", newStr;
  while (outStr.length < len)
  {
    newStr = Math.random().toString(bits).slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
  }
  return outStr.toUpperCase();
}

/*
* Returns the badges currently in the spreadsheet
* Commonly used to fill out, or refresh, the options of a select element
*/
function getBadgeNames() {
  var badgeSheet = SpreadsheetApp.openById(ScriptProperties.getProperty('test')).getSheetByName('BADGES');
  var badgesAoAs = badgeSheet.getRange(2, 1, badgeSheet.getLastRow() - 1, 1).getValues();
  var badges = [];
  for (i in badgesAoAs) {
    badges.push(badgesAoAs[i][0]);
  }
  return badges;
}

function doGet(request) {
    return HtmlService.createHtmlOutputFromFile('ui.html')
            .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

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
        for (line = fileArray.length - 1; --line; ) {
            var lineArray = fileArray[line].split(",");
            var name = lineArray[0];
            var email = lineArray[1].trim();

            var err = "";
            err += validateInput(name, ['text']);
            err += validateInput(email, ['email']);

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

function validateInput(value, array, opt) {
    var errorString = validateValue(value, 'empty');

    if (!errorString) {
        for (test in array) {
            errorString += validateValue(value, array[test]);
        }
    } else if (opt) {
        errorString = "";
    }

    return errorString;
}

function validateValue(value, test) {

    var urlPattern = /^https?\:\/\/[\w/.]+$/;  // start http(s):// then alphanumeric_ followed by a dot
    var pngPattern = /\.png$/;
    var jsonPattern = /\.json$/;
    var csvPattern = /\.csv$/;
    var emailPattern = /\@.*\..*$/;
    var textPattern = /^[A-Za-z\s]+$/;  // Upper or lower case letters, and spaces
    var errorString = "";

    switch (test) {
        case "url":
            Logger.log("checking input against URL rule");
            if (!urlPattern.test(value)) {
                errorString = value + ": Must be valid URL. ";
            }
            break;
        case "png":
            Logger.log("checking input against PNG rule");
            if (!pngPattern.test(value)) {
                errorString = value + ": Image must be of type PNG. ";
            }
            break;
        case "email":
            Logger.log("checking input against Email rule");
            if (!emailPattern.test(value)) {
                errorString = value + ": Not a valid email address, must contain . and @. ";
            }
            break;
        case "json":
            Logger.log("checking input against JSON rule");
            if (!jsonPattern.test(value)) {
                errorString = value + ": Not a valid JSON file. ";
            }
            break;
        case "csv":
            Logger.log("checking input against CSV rule");
            if (!csvPattern.test(value)) {
                errorString = value + ": Not a valid CSV file. ";
            }
            break;
        default:
        case "text":
            Logger.log("checking input against TEXT rule");
            if (!textPattern.test(value)) {
                errorString = value + "Text must contain only letters. ";
            }
        case "empty":
            Logger.log("checking field has input");
            if (value.length === 0) {
                errorString = value + "Field cannot be empty. ";
            }
            break;
    }

    return errorString;
}

