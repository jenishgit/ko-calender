define(['ko'], function(ko){
    ko.components.register('ko-selectable',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var repeator = ko.isObservable(params.repeator) ? params.repeator : ko.observableArray(params.repeator);

            var initialize = function(element){
                $(element).bind("mousedown", function (e) {
                    e.metaKey = false; //To prevent discontigous selection
                }).selectable({
                    filter: ".selectable-item"
                });
            };

            return {
                templateRef: templateRef,
                initialize: initialize,
                repeator: repeator
            }
        },
        template: { require: 'text!app/selectable/selectable.html'},
        synchronous: true
    })
});