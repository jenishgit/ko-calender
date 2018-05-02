define(['ko'], function (ko) {
    var getFlatData = function (dataSource, eventsObservablePath) {
        var data = [];
        if (dataSource.hasOwnProperty("nextLevel")) {
            if (ko.isObservable(dataSource[dataSource.nextLevel])) {
                arrayHelper(data, getFlatData(dataSource[dataSource.nextLevel](), eventsObservablePath))
            } else {
                arrayHelper(data, getFlatData(dataSource[dataSource.nextLevel], eventsObservablePath))
            }
        } else {
            dataSource.forEach(function (event) {
                if (ko.isObservable(event[eventsObservablePath])) {
                    arrayHelper(data, event[eventsObservablePath]())
                } else {
                    arrayHelper(data, event[eventsObservablePath])
                }
            })
        }
        return data;
    }

    var arrayHelper = function (mainArray, arrayToBeMerged) {
        arrayToBeMerged.forEach(function (event) {
            mainArray.push(event);
        });
    }

    return {
        getFlatData: getFlatData
    };
});