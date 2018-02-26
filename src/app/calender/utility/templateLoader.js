define(['ko', 'jquery'], function(ko, $){
    ko.components.register('ko-templateLoader',{
        viewModel: function(params){
            var templateURL = ko.isObservable(params.templateURL) ? params.templateURL : ko.observable(params.templateURL)
            var element = params.element;
            require([templateURL()], function(result){
                $(element).html(result)
            })
        },
        template: '<div></div>',
        synchronous: true
    });
})