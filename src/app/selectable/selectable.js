define(['ko'], function(ko){
    ko.components.register('ko-selectable',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var repeator = ko.isObservable(params.repeator) ? params.repeator : ko.observableArray(params.repeator);
            var element = params.element;

            $(element.parentElement).bind("mousedown", function (e) {
                e.metaKey = false; //To prevent discontigous selection
            }).selectable({
                filter: "td"
            });

            return {
                templateRef: templateRef,
                repeator: repeator
            }
        },
        template: { require: 'text!app/selectable/selectable.html'},
        synchronous: true
    })
});