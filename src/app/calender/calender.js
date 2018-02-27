define(['ko', 'app/calender/utility/dateHelper','app/bindings/elementHandleBinding', 'app/selectable/selectable'
        ,'app/calender/internalParts/dateTimeHeader', 'app/calender/utility/templateLoader'],
         function(ko, dateHelper, elementHandleBinding, selectableControl, dateTimeHeader, templateLoader){
    ko.components.register('ko-calender',{
        viewModel: function(params){

            var config = params.config;

            var startDate = ko.isObservable(config.startDate) ? config.startDate : ko.observable(config.startDate);
            var endDate = ko.isObservable(config.endDate) ? config.endDate : ko.observable(config.endDate);
            var dataSource = config.dataSource;

            var collections = [];

            if(startDate() < endDate()) {
                var k = startDate();
                while( k < endDate() ) {
                    k = dateHelper.addDays(k, 1);
                    collections.push({
                        date: k
                    });
                }
            }
            else {
                throw new Error('start date can not be greater than end date');
            }

            return {
                startDate: startDate,
                endDate: endDate,
                collections: collections,
                dataSource: dataSource,
                calenderConfig: config
            }

        },
        template: { require: 'text!app/calender/calender.html'},
        synchronous: true
    })
});