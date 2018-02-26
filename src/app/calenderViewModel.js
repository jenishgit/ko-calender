define(['ko', 'app/calender/config/subComponentConfig', 'app/calender/config/templateConfig'], 
        function(ko, calenderSubComponentConfig, templateConfig){
    var calenderViewModel = function(){
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function() {
            return this.firstName().toUpperCase();
        }, this);

        var startDate = ko.observable(new Date(2018,4,15));
        var endDate = ko.observable(new Date(2018,5,05));

        var calenderConfig = {
            startDate: startDate,
            endDate: endDate,
            subComponentConfig: calenderSubComponentConfig,
            templateConfig: templateConfig
        }

        this.config = calenderConfig;
    }
    return calenderViewModel;
})