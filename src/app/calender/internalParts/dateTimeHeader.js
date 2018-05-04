define(['ko'], function(ko){
    ko.components.register('ko-dateTimeHeader',{
        viewModel: function(params){
            var templateRef = ko.isObservable(params.templateRef) ? params.templateRef : ko.observable(params.templateRef);
            var dateTimeCollection = ko.isObservable(params.dateTimeCollection) ? params.dateTimeCollection : ko.observableArray(params.dateTimeCollection);
            var calenderConfig = params.calenderConfig;

            var groupings = ko.computed(function(){
                var grouping = {};
                dateTimeCollection().forEach(function(dateTime){
                    if(grouping[dateTime.date.toLocaleString("en-GB", { month: "long" })+", "+dateTime.date.getFullYear()]){
                        grouping[dateTime.date.toLocaleString("en-GB", { month: "long" })+", "+dateTime.date.getFullYear()]++;
                    }
                    else {
                        grouping[dateTime.date.toLocaleString("en-GB", { month: "long" })+", "+dateTime.date.getFullYear()] = 1;
                    }
                });
                var groupings = [];
                for (const key in grouping) {
                    if (grouping.hasOwnProperty(key)) {
                        const value = grouping[key];
                        groupings.push({ text: key, colspanValue: value});
                    }
                }
                return groupings;
            });

            return {
                templateRef: templateRef,
                dateTimeCollection: dateTimeCollection,
                calenderConfig: calenderConfig,
                groupings: groupings
            }
        },
        template: { require: 'text!app/calender/internalParts/dateTimeHeader.html'},
        synchronous: true
    });
})