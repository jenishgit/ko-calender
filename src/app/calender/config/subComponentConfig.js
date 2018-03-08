define(['ko'], function(ko){
    
    var subComponentConfig = {
        dateTimeHeader: ko.observable('ko-dateTimeHeader'),
        selectable: ko.observable('ko-selectable'),
        draggable: ko.observable('ko-draggable'),
        drappable: ko.observable('ko-droppable')
    };

    return subComponentConfig;
})