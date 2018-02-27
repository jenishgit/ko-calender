define(['ko', 'text!app/calender/config/templates.html'], function(ko){
    var templateConfig = {
        calenderHeaderTemplate: ko.observable('calenderHeaderTemplate'),
        calenderDataTemplate: ko.observable('calenderDataTemplate'),
        selectableTemplate: ko.observable('selectableTemplate'),
        calenderDateHeaderTemplate: ko.observable('calenderDateHeaderTemplate')
    }
    return templateConfig;
})