define(['ko', 'app/calender/config/subComponentConfig', 'app/calender/config/templateConfig', 
'app/calender/config/dateProvider', 'app/calender/bindings/draggable', 'app/calender/bindings/droppable'], 
        function(ko, calenderSubComponentConfig, templateConfig, dateProvider){
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


        var dragConfig = ko.observable({
            start: function () {
                $(this).animate({
                    opacity: '0.5'
                }, 250);
            },
            stop: function () {
                $(this).animate({
                    opacity: '1'
                }, 250);
            },
            revert: true
        });

        var dropConfig = ko.observable({
            drop: function () {
        		alert('jenish');
                $('#draggable').animate({ opacity: 0.5 }, 250).remove();
                $(this).html('Dropped');
            }
        });

        var placement = {
            startDate: ko.observable(new Date(2018, 4, 26)),
            endDate: ko.observable(new Date(2018, 4, 28))
        }

        var placement2 = {
            startDate: ko.observable(new Date(2018, 4, 30)),
            endDate: ko.observable(new Date(2018, 5, 2))
        }

        this.addPlacement = function(){
            apartments()[0].placements.push(placement);
            apartments()[1].placements.push(placement2);
        }

        var calenderConfig = {
            cssClass: {
                occupied: 'occupied'
            },
            eventsObservablePath: 'placements',
            startDate: startDate,
            endDate: endDate,
            subComponentConfig: calenderSubComponentConfig,
            templateConfig: templateConfig,
            dataSource: apartments,
            dateTimeProvider: dateProvider.getValues,
            dragDropConfig:{
                drag: dragConfig,
                drop: dropConfig
            }
        }

        this.config = calenderConfig;
    }
    return calenderViewModel;
})