define(['ko'], function(ko){
    ko.components.register('ko-dateTimeHeader',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var dateTimeCollection = ko.isObservable(params.dateTimeCollection) ? params.dateTimeCollection : ko.observableArray(params.dateTimeCollection);
            var calenderConfig = params.calenderConfig;
            return {
                templateRef: templateRef,
                dateTimeCollection: dateTimeCollection,
                calenderConfig: calenderConfig
            }
            
        },
        template: { require: 'text!app/calender/internalParts/dateTimeHeader.html'},
        synchronous: true
    });
})