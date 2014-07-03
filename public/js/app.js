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

    function reloadWithSelectedUsers(){
        var x = $('.x').val().replace(cleanNameRegex, ''),
            y = $('.y').val().replace(cleanNameRegex, '');

        window.location.href = '/' + x + '/or/' + y;
    }

    $('body').append(view.$el);

    $('.go').click(function(){
        reloadWithSelectedUsers();
    });

    $('.x, .y').keypress(function(e){
        if(e.which === 13){
            reloadWithSelectedUsers();
        }
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
