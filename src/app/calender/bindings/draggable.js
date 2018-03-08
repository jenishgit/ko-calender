define(['ko', 'jquery'], function (ko, $) {
    ko.bindingHandlers.draggable = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            dragConfig = ko.unwrap(valueAccessor());
            $(element).draggable(dragConfig);
        }
    };
});


