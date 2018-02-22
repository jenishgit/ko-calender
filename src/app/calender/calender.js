define(['ko', 'app/bindings/elementHandleBinding'], function(ko, elementHandleBinding){
    ko.components.register('ko-calender',{
        viewModel: function(params){
            
        },
        template: { require: 'text!app/calender/calender.html'},
        synchronous: true
    })
});