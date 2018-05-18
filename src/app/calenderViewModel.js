define(['ko', 'app/calender/config/subComponentConfig', 'app/calender/config/templateConfig', 
'app/calender/config/dateProvider', 'app/calender/bindings/draggable', 'app/calender/bindings/droppable', 
'app/calender/utility/templateLoader', 'app/calender/utility/dateHelper'], 
        function(ko, calenderSubComponentConfig, templateConfig, dateProvider, draggable, droppable, templateLoader, dateHelper){
    var calenderViewModel = function(){
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.pureComputed(function() {
            return this.firstName().toUpperCase();
        }, this);

        var startDate = ko.observable(new Date(2018,4,15));
        var endDate = ko.observable(new Date(2018,5,05));

        var apartments = ko.observableArray([
            {
                nextLevel: 'rooms',
                name: ko.observable('Apt 01'),
                rooms: ko.observableArray([
                    {
                        name: 'room1',
                        placements: ko.observableArray([
                            {
                                startDate: ko.observable(new Date(2018, 4, 16)),
                                endDate: ko.observable(new Date(2018, 4, 20))
                            }
                        ])
                    },
                    {
                        name: 'room2',
                        placements: ko.observableArray([
                            {
                                startDate: ko.observable(new Date(2018, 4, 26)),
                                endDate: ko.observable(new Date(2018, 4, 28))
                            }
                        ])
                    }
                ])
            },
            {
                nextLevel: 'rooms',
                name: ko.observable('Apt 02'),
                rooms: ko.observableArray([
                    {
                        name: 'room1',
                        placements: ko.observableArray([
                            {
                                startDate: ko.observable(new Date(2018, 4, 22)),
                                endDate: ko.observable(new Date(2018, 4, 25))
                            }
                        ])
                    },
                    {
                        name: 'room2',
                        placements: ko.observableArray([
                            {
                                startDate: ko.observable(new Date(2018, 4, 30)),
                                endDate: ko.observable(new Date(2018, 5, 2))
                            }
                        ])
                    }
                ])
            }
        ])

        var buildings = ko.observableArray([
            {
                nextLevel: "apartments",
                name: "building 1",
                apartments : ko.observableArray([
                    {
                        nextLevel: 'beds',
                        name: ko.observable('Apt 01'),
                        beds: ko.observableArray([
                            {
                                name: 'bed 1',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 16)),
                                        endDate: ko.observable(new Date(2018, 4, 20))
                                    }
                                ])
                            },
                            {
                                name: 'bed 2',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 26)),
                                        endDate: ko.observable(new Date(2018, 4, 28))
                                    }
                                ])
                            }
                        ])
                    },
                    {
                        nextLevel: 'beds',
                        name: ko.observable('Apt 02'),
                        beds: ko.observableArray([
                            {
                                name: 'bed 1',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 22)),
                                        endDate: ko.observable(new Date(2018, 4, 25))
                                    }
                                ])
                            }
                        ])
                    }
                ])
            },
            {
                nextLevel: "apartments",
                name: "building 2",
                apartments : ko.observableArray([
                    {
                        nextLevel: 'beds',
                        name: ko.observable('Apt 01'),
                        beds: ko.observableArray([
                            {
                                name: 'bed 1',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 16)),
                                        endDate: ko.observable(new Date(2018, 4, 20))
                                    }
                                ])
                            },
                            {
                                name: 'bed 2',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 26)),
                                        endDate: ko.observable(new Date(2018, 4, 28))
                                    }
                                ])
                            }
                        ])
                    },
                    {
                        nextLevel: 'beds',
                        name: ko.observable('Apt 02'),
                        beds: ko.observableArray([
                            {
                                name: 'bed 1',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 22)),
                                        endDate: ko.observable(new Date(2018, 4, 25))
                                    }
                                ])
                            },
                            {
                                name: 'bed 2',
                                placements: ko.observableArray([
                                    {
                                        startDate: ko.observable(new Date(2018, 4, 30)),
                                        endDate: ko.observable(new Date(2018, 5, 2))
                                    }
                                ])
                            }
                        ])
                    }
                ])
            }
        ]);

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
            buildings()[0].apartments()[0].beds()[0].placements.push(placement);
            buildings()[1].apartments()[0].beds()[0].placements.push(placement2);
        }

        this.addDays = function() {
            var newDate = dateHelper.addDays(endDate(), 5);
            endDate(newDate);
        }

        var onBeforeEventCreated = function() {
            var d = $.Deferred();
            $('#myModal').modal('show');
            $("#btnSave").click(function() {
                d.resolve(true);
            });
            $('#myModal').on('hidden.bs.modal', function (e) {
                d.resolve(false);
              })
            return d.promise();
        };

        var calenderConfig = {
            cssClass: {
                occupied: 'occupied'
            },
            eventsObservablePath: 'placements',
            startDate: startDate,
            endDate: endDate,
            subComponentConfig: calenderSubComponentConfig,
            templateConfig: templateConfig,
            dataSource: buildings,
            events: {
                onBeforeEventCreated: onBeforeEventCreated
            },
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