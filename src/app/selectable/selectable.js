define(['ko'], function(ko){
    ko.components.register('ko-selectable',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var timeContext = ko.isObservable(params.timeContext) ? params.timeContext : ko.observableArray(params.timeContext);
            var element = params.element;
            var data = ko.isObservable(params.data) ? params.data : ko.observable(params.data);
            var calenderConfig = params.calenderConfig;

            $(element).bind("mousedown", function (e) {
                e.metaKey = false; //To prevent discontigous selection
            }).selectable({
                filter: "td",
                selected: function(event, ui) {
                },
                stop: function(event, ui){
                    var selectedItems = $('.ui-selected', this);
                    var firstSelectedCellContext = ko.contextFor(selectedItems[0]).$data;
                    var lastSelectedCellContext = ko.contextFor(selectedItems[selectedItems.length-1]).$data;
                    firstSelectedCellContext.end = lastSelectedCellContext.end;
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

            var instance = $(element).selectable("instance");
            debugger;

            return {
                templateRef: templateRef,
                timeContext: timeContext,
                calenderConfig: calenderConfig,
                data: data
            }
        },
        template: { require: 'text!app/selectable/selectable.html'},
        synchronous: true
    })
});