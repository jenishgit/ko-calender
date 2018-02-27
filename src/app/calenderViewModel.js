define(['ko', 'app/calender/config/subComponentConfig', 'app/calender/config/templateConfig'], 
        function(ko, calenderSubComponentConfig, templateConfig){
    var calenderViewModel = function(){
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function() {
            return this.firstName().toUpperCase();
        }, this);

        var startDate = ko.observable(new Date(2018,4,15));
        var endDate = ko.observable(new Date(2018,5,05));

        var apartments = ko.observableArray([
            {
                name: ko.observable('Apt 01'),
                placements: ko.observableArray([
                    {
                        startDate: ko.observable(new Date(2018, 4, 16)),
                        endDate: ko.observable(new Date(2018, 4, 20))
                    }
                ])
            },
            {
                name: ko.observable('Apt 02'),
                placements: ko.observableArray([
                    {
                        startDate: ko.observable(new Date(2018, 4, 22)),
                        endDate: ko.observable(new Date(2018, 4, 25))
                    }
                ])
            }
        ])

        templateConfig.calenderHeaderTemplate('customcalenderHeaderTemplate');
        templateConfig.calenderDataTemplate('customCalenderDataTemplate');

        var calenderConfig = {
            startDate: startDate,
            endDate: endDate,
            subComponentConfig: calenderSubComponentConfig,
            templateConfig: templateConfig,
            dataSource: apartments
        }

        this.config = calenderConfig;
    }
    return calenderViewModel;
})