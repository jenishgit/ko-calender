define(['ko'], function(ko){
    ko.components.register('ko-dateTimeHeader',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var repeator = ko.isObservable(params.repeator) ? params.repeator : ko.observableArray(params.repeator);

            return {
                templateRef: templateRef,
                repeator: repeator
            }
            
        },
        template: { require: 'text!app/calender/internalParts/dateTimeHeader.html'},
        synchronous: true
    });
})