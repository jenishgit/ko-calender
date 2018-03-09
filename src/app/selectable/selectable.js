define(['ko'], function(ko){
    ko.components.register('ko-selectable',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var dateTimeCollection = ko.isObservable(params.dateTimeCollection) ? params.dateTimeCollection : ko.observableArray(params.dateTimeCollection);
            var element = params.element;
            var data = ko.isObservable(params.data) ? params.data : ko.observable(params.data);
            var calenderConfig = params.calenderConfig;

            $(element.parentElement).bind("mousedown", function (e) {
                e.metaKey = false; //To prevent discontigous selection
            }).selectable({
                filter: "td",
                selected: function(event, ui) {
                },
                stop: function(event, ui){
                    var selectedItems = $('.ui-selected', this);
                    console.log(selectedItems.length);
                    var colSpan = 0;
                    for(var i = selectedItems.length - 1; i > 0; i--){
                        colSpan = colSpan + selectedItems[i].colSpan;
                        $(selectedItems[i]).remove();
                    }
                    selectedItems[0].colSpan  += colSpan;
                    var t = ko.contextFor(selectedItems[0]);
                    selectedItems.removeClass('ui-selected');
                }
            });

            return {
                templateRef: templateRef,
                dateTimeCollection: dateTimeCollection,
                calenderConfig: calenderConfig,
                data: data
            }
        },
        template: { require: 'text!app/selectable/selectable.html'},
        synchronous: true
    })
});