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
                    onSelectionDone();
                }
            });

            var onSelectionDone = function(){
                var selectedItems = $('.ui-selected', element);
                var firstSelectedCellContext = ko.contextFor(selectedItems[0]).$data;
                var lastSelectedCellContext = ko.contextFor(selectedItems[selectedItems.length-1]).$data;
                firstSelectedCellContext.end = lastSelectedCellContext.end;
                var colSpan = 0;
                for(var i = selectedItems.length - 1; i > 0; i--){
                    colSpan = colSpan + selectedItems[i].colSpan;
                    $(selectedItems[i]).remove();
                }
                selectedItems[0].colSpan  += colSpan;
                selectedItems.removeClass('ui-selected');
                selectedItems.addClass(calenderConfig.cssClass.occupied);
            }

            var plotData = function(data, startDate, endDate){
                data().placements().forEach(item => {
                    if (startDate < item.startDate() && item.endDate() < endDate) {
                        setTimeout(function(){
                            var itemToBeSelected = [];
                            var tds = $(element).children('td');
                            for (let index = 1; index < tds.length; index++) {
                                const td = tds[index];
                                var context = ko.contextFor(td).$data;
                                if(context.start.getTime() == item.startDate().getTime()){
                                    for (let i = index; i < tds.length ; i++){
                                        const temp = tds[i];
                                        itemToBeSelected.push(temp);
                                        var context2 = ko.contextFor(temp).$data;
                                        if ( context2.end.getTime() == item.endDate().getTime() ){
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            $(itemToBeSelected).addClass('ui-selected');
                            onSelectionDone();
                        }, 1000);
                    }
                });
            }
            plotData(data, calenderConfig.startDate(), calenderConfig.endDate());
            var instance = $(element).selectable("instance");

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