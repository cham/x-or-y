define([
    'backbone',
    'jquery',
    'hgn!/js/templates/tweet',
    'css!/css/RandomTweetView.css'
],
function(
    Backbone,
    $,
    template
){
    'use strict';

    var loadingMessageClass = 'loading',
        $loadingMessage = $('<div class="'+loadingMessageClass+'"></div>');

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
        $container.after('<a class="tweet-link" href="http://twitter.com/'+ username + '/status/'+ tweetid +'" target="_blank">Original</a>');
    }

    function removeLoadingMessage($el){
        $('.loadingMessageClass').remove();
    }

    function showLoadingMessage($el){
        removeLoadingMessage($el);
        $el.append($loadingMessage.clone());
    }

    function fetchAnotherTweet(view, model){
        model.fetch().then(function(){
            view.render();
        });
    }

    function showNextTweetButton(view){
        view.$('.next-tweet').removeClass('hidden');
    }

    return Backbone.View.extend({

        className: 'RandomTweetView',

        events: {
            'click .userbutton': function(){
                var isX = this.model.get('thisUser') === 1,
                    tweetId = this.model.get('id'),
                    username = isX ? this.model.get('x') : this.model.get('y');

                highlightButtons(this.$('.userbutton'), isX);
                linkTweet(this.$('.the-tweet'), username, tweetId);
                showNextTweetButton(this);
            },
            'click .next-tweet': function(){
                fetchAnotherTweet(this, this.model);
            }
        },

        constructor: function RandomTweetView(options){
            this.listenTo(options.model, 'fetch', function(){
                showLoadingMessage(this.$el);
            });
            this.listenTo(options.model, 'sync', function(){
                removeLoadingMessage(this.$el);
            });

            return Backbone.View.prototype.constructor.call(this, options);
        },

        render: function(){
            this.$el.html(template({
                body: this.model.get('tweet').trim(),
                imgPathX: this.model.get('userOne').replace('_normal','_400x400'),
                nameX: this.model.get('x'),
                imgPathY: this.model.get('userTwo').replace('_normal','_400x400'),
                nameY: this.model.get('y')
            }));
        }

    });

});
