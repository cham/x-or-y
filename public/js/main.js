require.config({
    paths: {
        'jquery': 'js/vendor/jquery/dist/jquery',
        'underscore': 'js/vendor/underscore/underscore',
        'backbone': 'js/vendor/backbone/backbone',
        'hogan': 'js/vendor/requirejs-hogan-plugin/hogan',
        'hgn': 'js/vendor/requirejs-hogan-plugin/hgn',
        'text': 'js/vendor/requirejs-text/text',
        'css': 'js/vendor/require-css/css',
        'moment': 'js/vendor/moment/moment'
    },
    shims: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    },
    hgn: {
        templateExtension: '.template'
    }
});

define(['js/app'], function(app){
    'use strict';

    return app;
});
