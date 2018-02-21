define(['ko'], function(ko){
    ko.components.register('ko-calender',{
        viewModel: function(params){
            
        },
        template: { require: 'text!app/calender/calender.html'},
        synchronous: true
    })
});