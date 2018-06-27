"use strict";
var transList = [];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function transaction(type, amount, date) {
    this.type = type;
    this.amount = amount;
    this.amountDisplay = (type === "deposit") ? amount : "(" + amount + ")";
    this.dateDisplay = date;
};

var getDateParts = function(dateValue) {
    if (typeof dateValue === "undefined") {
        var currentdate = new Date();
        return [currentdate.getMonth() + 1, currentdate.getDate(), currentdate.getFullYear()];
    }
    var datereg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (dateValue.match(datereg)) {
        var splitDateInput = dateValue.split("/");
        var monthPart = parseInt(splitDateInput[0], 10);
        var dayPart = parseInt(splitDateInput[1], 10);
        var yrPart = parseInt(splitDateInput[2], 10);
        var date = new Date();
        date.setYear(yrPart);
        date.setMonth(monthPart - 1);
        date.setDate(dayPart);
        if (date.getFullYear() === yrPart && date.getMonth() + 1 === monthPart && date.getDate() === dayPart) {
            return [monthPart, dayPart, yrPart];
        }
    }
}

var getTransaction = function(index) {
    if (typeof index === "undefined") {
        return transList.length;
    } else if (index < transList.length) {
        return transList[index];
    }
};
var addTransaction = function(type, amount, date) {

    transList.push(new transaction(type, amount, date));
};
var calculateBalance = function(type, amount, total) {

    amount = parseFloat(amount, 10);
    total = parseFloat(total, 10);
    if (type === "deposit")
        return (total + amount).toFixed(2);
    else
        return (total - amount).toFixed(2);
};

var formatTotal = function(am) {

    am = parseFloat(am, 10);

    return (am < 0) ? "(" + Math.abs(am).toFixed(2) + ")" : am.toFixed(2);
};