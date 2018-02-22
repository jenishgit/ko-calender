define(['ko'], function (ko) {
    ko.bindingHandlers.elementHandle = {
        init: function (element, valueAccessor) {
            var handle = valueAccessor();
            handle(element);
        }
    };
});


