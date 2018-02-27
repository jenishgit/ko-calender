define(['ko', 'app/calender/utility/dateHelper'], function(ko, dateHelper){

    
    var getValues = function(startDate, endDate){
        var collections = [];
        if(startDate() < endDate()) {
            var k = startDate();
            while( k < endDate() ) {
                k = dateHelper.addDays(k, 1);
                collections.push({
                    date: k
                });
            }
            return collections;
        }
        else {
            throw new Error('start date can not be greater than end date');
        }
    }

    return {
        getValues: getValues
    }

});