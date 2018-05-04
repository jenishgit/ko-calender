define(['ko', 'app/calender/utility/dateHelper','app/bindings/elementHandleBinding', 'app/selectable/selectable'
        ,'app/calender/internalParts/dateTimeHeader', 'app/calender/utility/templateLoader', 'app/calender/utility/dateHelper'],
         function(ko, dateHelper, elementHandleBinding, selectableControl, dateTimeHeader, templateLoader, dateHelper){
    ko.components.register('ko-calender',{
        viewModel: function(params){

            var config = params.config;

            var startDate = ko.isObservable(config.startDate) ? config.startDate : ko.observable(config.startDate);
            var endDate = ko.isObservable(config.endDate) ? config.endDate : ko.observable(config.endDate);
            var dataSource = config.dataSource;

            
            var updateTimeContext = function(data, dateTimeCollection){
                    if(data.nextLevel){
                        data[data.nextLevel]().forEach(function(data){
                            updateTimeContext(data, dateTimeCollection);
                        })
                    } else {
                        timeContextToBeAdded = getTimeContext(dateTimeCollection);
                        timeContextToBeAdded().forEach(function(item){
                            data.timeContext.push(item);
                        })
                    }
            }

            var dateTimeCollection = ko.observableArray(config.dateTimeProvider(startDate(), endDate()));

            endDate.subscribeChanged(function(newValue, oldValue){
                var dateTimeCollectionToBeAdded = config.dateTimeProvider(oldValue, newValue);
                dateTimeCollectionToBeAdded.forEach(function(item){
                    dateTimeCollection.push(item)    
                });
                dataSource().forEach(function(item){
                    updateTimeContext(item, ko.observableArray(dateTimeCollectionToBeAdded));
                })
            })

            var getTimeContext = function(dateTimeCollection){
                var timeContext = ko.observableArray([]);
                dateTimeCollection().forEach(dateTime => {
                    timeContext.push({
                        start: dateTime.date,
                        end: dateTime.date
                    });
                });
                return timeContext;
            };
            //var timeContext = getTimeContext(dateTimeCollection);

            var setTimeContext = function(data) {
                if(data.nextLevel){
                    data[data.nextLevel]().forEach(function(data){
                        setTimeContext(data);
                    })
                } else {
                    data.timeContext = getTimeContext(dateTimeCollection);
                }
            }

            dataSource().forEach(function (data){
                setTimeContext(data);
            })

            // //TODO: remove hardcoded level logic
            // dataSource().forEach(function (data){
            //     if(data.nextLevel){
            //         data[data.nextLevel]().forEach(function(data){
            //             data.timeContext = getTimeContext(dateTimeCollection);
            //         })
            //     }
            //     else {
            //         data.timeContext = getTimeContext(dateTimeCollection);
            //     }
            // });

            
            

            return {
                startDate: startDate,
                endDate: endDate,
                //timeContext: timeContext,
                dataSource: dataSource,
                calenderConfig: config,
                dateTimeCollection: dateTimeCollection
            }

        },
        template: { require: 'text!app/calender/calender.html'},
        synchronous: true
    })
});