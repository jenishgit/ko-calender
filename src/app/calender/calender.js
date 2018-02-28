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

            return {
                startDate: startDate,
                endDate: endDate,
                dateTimeCollection: dateTimeCollection,
                dataSource: dataSource,
                calenderConfig: config
            }

        },
        template: { require: 'text!app/calender/calender.html'},
        synchronous: true
    })
});