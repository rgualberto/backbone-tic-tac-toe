define([
    'jquery',
    'underscore',
    'backbone',
    'models/game_state',
    'views/game/board',
    'views/game/score'
    ],

    function ($, _, Backbone, GameStateModel, BoardView, ScoreView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            ''      : 'home',
            'placePiece/:tile' : 'nextPlay',
            'winner/:player/:location' : 'endGame',
            'new' : 'newGame'
        }
    });

    var initialize = function () {
        var game = new AppRouter(),
            appState = {
                gameState: null,
                piece: null,
                scoreState: null
            };


        game.on('route:newGame', function () {
            var boardView = new BoardView(),
                scoreView = new ScoreView();

            appState.gameState = new GameStateModel({
                newGame: true
            });

            boardView.render(appState);
            scoreView.render(appState);
            scoreView.removeNewGameButton();
        });

        game.on('route:nextPlay', function (tile) {
            var boardView = new BoardView(),
                currentTurn = appState.gameState.get('turn'),
                gameResult;

            appState.piece.place(currentTurn, tile);
            boardView.render(appState);

            gameResult = appState.gameState.evalGame(appState.piece);

            if (gameResult !== false) {
                game.navigate("winner/" + gameResult.winner + "/" + gameResult.sequence, {trigger: true});
            }
            else {
                appState.gameState.nextTurn();
            }
        });

        game.on('route:endGame', function (player, location) {
            var boardView = new BoardView(),
                scoreView = new ScoreView();

            appState.piece.renderFinished(location);
            boardView.render(appState);

            appState.scoreState.updateScore(player);
            scoreView.render(appState);
            scoreView.addNewGameButton();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
