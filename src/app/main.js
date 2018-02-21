define(['ko', 'app/calenderViewModel', 'app/calender/calender'], function(ko, calenderViewModel, calenderControl){
    ko.applyBindings(new calenderViewModel());
});