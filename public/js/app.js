define([
    'jquery',
    'js/models/RandomTweetModel',
    'js/views/RandomTweetView'
],
function(
    $,
    RandomTweetModel,
    RandomTweetView
){
    'use strict';

    var cleanNameRegex = /[^a-z0-9_]/ig,
        model = new RandomTweetModel(),
        view = new RandomTweetView({
            model: model
        });

    $('body').append(view.$el);

    $('.go').click(function(){
        var x = $('.x').val().replace(cleanNameRegex, ''),
            y = $('.y').val().replace(cleanNameRegex, '');

        window.location.href = '/' + x + '/or/' + y;
    });

    if($('.x').val() && $('.y').val()){
        model.set({
            x: $('.x').val(),
            y: $('.y').val()
        });
        model.fetch().then(function(){
            view.render();
        });
    }

});
