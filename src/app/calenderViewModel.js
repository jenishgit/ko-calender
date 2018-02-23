define(['ko'], function(ko){
    var calenderViewModel = function(){
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function() {
            return this.firstName().toUpperCase();
        }, this);

        this.startDate = new Date(2018,4,15);
        this.endDate = new Date(2018,5,05);
    }
    return calenderViewModel;
})