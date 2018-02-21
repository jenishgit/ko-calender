requirejs.config({
    baseUrl: '',
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        ko: '../node_modules/knockout/build/output/knockout-latest',
        bootstrap: '../node_modules/bootstrap/dist/js/bootstrap',
        text: '../node_modules/text/text'
    },
    map: {
        '*': {
            'knockout' : 'ko'
        }
    },
    config: {
        text: {
           useXhr: function (url, protocol, hostname, port) {
              return true;
           }
        }
     }
});
requirejs(['app/main'])