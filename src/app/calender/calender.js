define(['ko', 'app/calender/utility/dateHelper','app/bindings/elementHandleBinding', 'app/selectable/selectable'
        ,'app/calender/internalParts/dateTimeHeader', 'app/calender/utility/templateLoader'],
         function(ko, dateHelper, elementHandleBinding, selectableControl, dateTimeHeader, templateLoader){
    ko.components.register('ko-calender',{
        viewModel: function(params){

            var config = params.config;

            var startDate = ko.isObservable(config.startDate) ? config.startDate : ko.observable(config.startDate);
            var endDate = ko.isObservable(config.endDate) ? config.endDate : ko.observable(config.endDate);
            var dataSource = config.dataSource;

            var dateTimeCollection = config.dateTimeProvider(startDate, endDate);
            var getTimeContext = function(dateTimeCollection){
                var timeContext = [];
                dateTimeCollection.forEach(dateTime => {
                    timeContext.push({
                        start: dateTime.date,
                        end: dateTime.date
                    });
                });
                return timeContext;
            };
            //var timeContext = getTimeContext(dateTimeCollection);

            dataSource().forEach(function (data){
                if(data.nextLevel){
                    data[data.nextLevel]().forEach(function(data){
                        data.timeContext = getTimeContext(dateTimeCollection);
                    })
                }
                else {
                    data.timeContext = getTimeContext(dateTimeCollection);
                }
            });

            
            

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