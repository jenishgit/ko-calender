define([], function(){

    var addDays = function(theDate, days) {
        return new Date(theDate.getTime() + days*24*60*60*1000);
    };

    var addMonths = function(theDate, months) {
        var temp = new Date(theDate);
        temp.setMonth(temp.getMonth() + months);
        return temp;
    }

    var addYears = function(theDate, years){
        var temp = new Date(theDate);
        temp.setFullYear(temp.getFullYear() + years);
        return temp;
    }

    return {
        addDays: addDays,
        addMonths: addMonths,
        addYears: addYears
    }
})