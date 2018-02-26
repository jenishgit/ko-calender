define(['ko', 'text!app/calender/config/templates.html'], function(ko){
    var templateConfig = {
        selectableTemplate: ko.observable('selectableTemplate'),
        calenderDateHeaderTemplate: ko.observable('calenderDateHeaderTemplate')
    }

    return templateConfig;
})