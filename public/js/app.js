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

    var model = new RandomTweetModel(),
        view = new RandomTweetView({
            model: model
        });

    $('body').append(view.$el);

    $('.btn').click(function(){
        var x = $('.x').val(),
            y = $('.y').val();

        model.set({
            x: x,
            y: y
        });
        model.fetch().then(function(){
            view.render();
        });
    });

});
