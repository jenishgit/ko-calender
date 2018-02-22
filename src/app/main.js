define(['ko', 'app/calenderViewModel', 'app/calender/calender', 'app/selectable/selectable'],
 function(ko, calenderViewModel, calenderControl, selectableControl){
    ko.applyBindings(new calenderViewModel());
});