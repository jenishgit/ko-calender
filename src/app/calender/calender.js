define(['ko', 'app/utilities/dateHelper','app/bindings/elementHandleBinding', 'app/selectable/selectable'],
         function(ko, dateHelper, elementHandleBinding, selectableControl){
    ko.components.register('ko-calender',{
        viewModel: function(params){

            var startDate = ko.isObservable(params.startDate) ? params.startDate : ko.observable(params.startDate);
            var endDate = ko.isObservable(params.endDate) ? params.endDate : ko.observable(params.endDate);
            var selectableTemplateRef = ko.isObservable(params.selectableTemplateRef) ? params.selectableTemplateRef : ko.observable(params.selectableTemplateRef);

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
                selectableTemplateRef : selectableTemplateRef,
                collections: collections
            }

        },
        template: { require: 'text!app/calender/calender.html'},
        synchronous: true
    })
});