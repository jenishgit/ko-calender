requirejs.config({
    baseUrl: '',
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        ko: '../node_modules/knockout/build/output/knockout-latest',
        bootstrap: '../node_modules/bootstrap/dist/js/bootstrap.min',
        jqueryUI: '../node_modules/jquery-ui-dist/jquery-ui.min',
        uiPunch: '../node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min',
        text: '../node_modules/text/text'
    },
    shim: {
        'bootstrap' : {
            deps: ['jquery', 'jqueryUI']
        }
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
requirejs(
    [
        'app/main', 
        'jquery',
        'jqueryUI', 
        'ko',
        'bootstrap'
    ], function(){
        requirejs(['uiPunch'])
    })