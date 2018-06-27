"use strict";
var $ = function(id) { return document.getElementById(id); };

var updateDisplay = function() {
    var html = "<tr><th>Date</th><th>Amount</th><th>Balance</th></tr>";
    var html = html.concat("<tr><td></td><td></td><td>0</td></tr>");
    var count = getTransaction();
    var total = 0;
    for (var i = 0; i < count; i++) {
        var trans = getTransaction(i);
        total = calculateBalance(trans["type"], trans["amount"], total);

        html = html.concat("<tr><td>", trans["dateDisplay"], "</td><td>", trans["amountDisplay"], "</td><td>", formatTotal(total), "</td></tr>");
    }
    $("transactions").innerHTML = html;

};

var getValidDateString = function() {
    var dtParts;
    if ($("date").value === "") {
        dtParts = getDateParts();
    } else {
        dtParts = getDateParts($("date").value);
    }
    if (typeof dtParts !== "undefined") {

        return months[dtParts[0] - 1] + " " + ((dtParts[1] < 10 ? "0" : "") + dtParts[1]) + " " + dtParts[2];
    }
    alert("Please enter date in format MM/DD/YYYY e.g. 2/28/17. You may leave blank if transaction happened today."); // Instrictions
    $("date").focus();
};

var getValidType = function(type) {

    if ($("type").value === "deposit" || $("type").value === "withdrawal")
        return $("type").value;

    alert("Invalid Type.");
    $("type").focus();
}
var getValidateAmount = function() {
    if (isNaN($("amount").value)) {
        alert("Invalid amount.");
        $("amount").focus();
        return;
    }

    var returnValue = parseFloat($("amount").value, 10).toFixed(2);

    if (parseFloat($("amount").value, 10) < 0) {
        alert("If it is a withdrawal, select withdrawal in Type dropdown and enter a positive amount here.");
        $("amount").focus();
        return;
    }
    return returnValue;
}

var add = function() {
    var cType = getValidType();
    var cAmount = getValidateAmount();
    var cDateString = getValidDateString();
    if (typeof cType === "undefined" || typeof cAmount === "undefined" || typeof cDateString === "undefined")
        return;
    addTransaction(cType, cAmount, cDateString);
    updateDisplay();
};

window.onload = function() {
    $("add").onclick = add;
    updateDisplay();
};