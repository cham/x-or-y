define([
    'backbone',
    'hgn!/js/templates/tweet',
    'css!/css/RandomTweetView.css'
],
function(
    Backbone,
    template
){
    'use strict';

    function getProfileImage(model, profileKey){
        return model.get(profileKey).profile_image_url.replace('_normal','_400x400');
    }

    function highlightButtons($buttons, isX){
        if(isX){
            $buttons.filter('.userx').addClass('correct');
            $buttons.filter('.usery').addClass('incorrect');
        }else{
            $buttons.filter('.userx').addClass('incorrect');
            $buttons.filter('.usery').addClass('correct');
        }
    }

    function linkTweet($container, username, tweetid){
        // $container.after('<a class="tweet-link" href="http://twitter.com/'+ username + '/status/'+ tweetid +'" target="_blank">Original</a>');
    }

    return Backbone.View.extend({

        className: 'RandomTweetView',

        events: {
            'click .userbutton': function(){
                var isX = this.model.get('user') === this.model.get('x'),
                    tweetId = this.model.get('tweet').id,
                    username = isX ? this.model.get('x') : this.model.get('y');

                highlightButtons(this.$('.userbutton'), isX);
                linkTweet(this.$('.the-tweet'), username, tweetId);
            }
        },

        render: function(){
            this.$el.html(template({
                body: this.model.get('tweet').text.trim(),
                imgPathX: getProfileImage(this.model, 'userOne'),
                nameX: this.model.get('x'),
                imgPathY: getProfileImage(this.model, 'userTwo'),
                nameY: this.model.get('y')
            }));
        }

    });

});
