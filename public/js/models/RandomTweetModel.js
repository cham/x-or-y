define([
    'backbone'
],
function(
    Backbone
){
    'use strict';

    return Backbone.Model.extend({
        urlRoot: '/x-or-y/randomtweet',

        url: function(){
            return this.urlRoot + '?x=' + this.get('x') + '&y=' + this.get('y');
        }
    });

});
