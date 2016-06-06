function showFieldset(id, makeVisible) {
    var fieldset = document.getElementById(id);
    makeVisible ? fieldset.style.display = "block" : fieldset.style.display = "none";
}

function resetFieldset(id) {
    showFieldset(id);

    var fieldset = document.getElementById(id);
    var inputs = fieldset.querySelectorAll("input, textarea");
    for (var i = inputs.length; i--;) {
        inputs[i].value = "";
    }

    /* Hide the error messages */
    var errors = fieldset.querySelectorAll(".error-msg");
    for (var j = errors.length; j--;) {
        errors[j].value = "";
    }

    fillSelect();
}

function getValue(id) {
    var elem = document.getElementById(id);
    return elem.value;
}

function setSelectedBadge() {
    fillSelect();

    var select = document.getElementById("badge-selector");
    var badgeName = document.getElementById("badge-name");
    var option = document.createElement("option");
    option.text = badgeName.value;
    select.add(option, 0);
    select.selectedIndex = 0;
}

function fillSelect() {
    var select = document.getElementById("badge-selector");
    var selectedBadge = select.value;
    console.log("selected badge: " + selectedBadge);

    /* First clear the options */
    while (select.hasChildNodes()) {
        select.removeChild(select.firstChild);
    }

    /* Add a prompt as the first option */
    var prompt = document.createElement("option");
    prompt.text = "Please choose";
    prompt.value = "Please choose";
    prompt.disabled = true;
    select.add(prompt, 0);
    select.selectedIndex = 0;

    /* Now add badges from server */
    google.script.run.withSuccessHandler(function (res) {
        for (var badge in res) {
            var option = document.createElement("option");
            option.text = res[badge];
            option.value = res[badge];
            select.add(option);
            if (option.text === selectedBadge) {
                select.selectedIndex = badge + 1;   // we add one for the "please choose" option
            }
        }
    }).getBadgeList(0);
}

window.addEventListener("load", fillSelect);
