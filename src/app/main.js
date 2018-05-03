define(['ko', 'app/calenderViewModel', 'app/calender/calender', 'app/selectable/selectable'],
 function(ko, calenderViewModel, calenderControl, selectableControl){

    ko.subscribable.fn.subscribeChanged = function (callback) {
        var oldValue;
        this.subscribe(function (_oldValue) {
            oldValue = _oldValue;
        }, this, 'beforeChange');
    
        this.subscribe(function (newValue) {
            callback(newValue, oldValue);
        });
    };

    ko.applyBindings(new calenderViewModel());
});