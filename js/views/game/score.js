define([
    'jquery',
    'underscore',
    'backbone',
    'models/score_state',
    'text!templates/game/score.html',
    'text!templates/game/new_game_button.html'
    ],

    function($, _, Backbone, ScoreStateModel, scoreTemplate, newGameButtonTemplate){

    var ScoreView = Backbone.View.extend({
        el: $('.score'),

        render: function (appState) {
            var scoreBoard = _.template(scoreTemplate),
                compiledScoreBoard;

            if (appState.scoreState === null) {
                appState.scoreState = new ScoreStateModel();
            }

            compiledScoreBoard = scoreBoard(appState.scoreState.attributes);

            this.$el.html(compiledScoreBoard);
        },

        addNewGameButton: function () {
            var $buttonContainer = $('.button-callout'),
                newGameButton = _.template(newGameButtonTemplate),
                compiledNewGameButton = newGameButton({});

            $buttonContainer.html(compiledNewGameButton);
        },

        removeNewGameButton: function () {
            var $buttonContainer = $('.button-callout');

            $buttonContainer.empty();
        }
    });

    return ScoreView;
});
