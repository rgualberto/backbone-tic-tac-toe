define([
    'jquery',
    'underscore',
    'backbone',
    'models/piece',
    'text!templates/game/board.html'
    ],

    function($, _, Backbone, PieceModel, boardTemplate){

    var BoardView = Backbone.View.extend({
        el: $('.main'),

        render: function (appState){
            var board = _.template(boardTemplate),
                compiledBoard,
                boardData,
                pieces,
                done;

            if (appState.piece === null || appState.gameState.get('newGame')) {
                appState.piece = new PieceModel();
                appState.gameState.set('newGame', false);
            }

            pieces = appState.piece.get('inPlay');
            done = (pieces['complete'] != undefined) && (pieces['complete'] == true);

            if (done) {
                delete pieces['complete'];
            }

            boardData = {
                "pieces": pieces,
                "done": done
            }

            compiledBoard = board(boardData);

            this.$el.html(compiledBoard);
        }
    });

    return BoardView;
});
