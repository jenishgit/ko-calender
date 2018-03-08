define(['ko', 'jquery'], function (ko, $) {
    ko.bindingHandlers.droppable = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            dropConfig = ko.unwrap(valueAccessor());
            $(element).droppable(dropConfig);
        }
    };
});