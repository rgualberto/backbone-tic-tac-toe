define([
    'jquery',
    'underscore',
    'backbone'
    ],

    function ($, _, Backbone) {

    var PieceModel = Backbone.Model.extend({
        defaults: function () {
            return {
                inPlay: {},
                positions: {
                    'X': [],
                    'O': []
                },
                lastPlay: {
                    player: 'X',
                    tile: 0
                },
                winningCombos: [
                            [1,2,3],
                            [1,5,9],
                            [1,4,7],
                            [2,5,8],
                            [3,6,9],
                            [3,5,7],
                            [4,5,6],
                            [7,8,9]
                    ]
            };
        },

        initialize: function () {
            // assign inPlay to empty board (give all 9 positions value of empty)
            var temp = {};

            for (var i = 1; i <= 9; i++) {
                temp['piece' + i.toString()] = '<a href="#/placePiece/' + i.toString() + '" /></a>';
            }

            this.set('inPlay', temp);
        },

        place: function (turn, tile) {
            var oldInPlay = this.get('inPlay'),
                oldPositions = this.get('positions'),
                currentTurn = oldPositions[turn],
                lastPlay = this.get('lastPlay');

            // set this tile to piece
            oldInPlay['piece' + tile.toString()] = '<div class="' + turn.toLowerCase() + '-piece piece"></div>';

            // return complete inPlay object
            this.set('inPlay', oldInPlay);

            // update positions for evaluation
            currentTurn.push(tile);
            currentTurn.sort();
            oldPositions[turn] = currentTurn;
            this.set('positions', oldPositions);

            lastPlay.player = turn;
            lastPlay.tile = tile;
            this.set('lastPlay', lastPlay);

            return this.get('inPlay');
        },

        renderFinished: function (location) {
            var positionList = this.get('positions'),
                xList = positionList.X,
                oList = positionList.O,
                oldInPlay = this.get('inPlay'),
                filledSpaces = xList.concat(oList).map(function (x) {
                    return parseInt(x);
                }),
                emptySpaces = _.difference([1,2,3,4,5,6,7,8,9], filledSpaces),
                winners;

            for (var i = 0; i < emptySpaces.length; i++) {
                oldInPlay['piece' + emptySpaces[i].toString()] = '<div class="piece"></div>';
            }

            if (location != "0-0-0") {
                winners = location.split('-');

                for (var j = 0; j < winners.length; j++) {
                    oldInPlay['piece' + winners[j]] = oldInPlay['piece' + winners[j]].replace('class="', 'class="active ');
                }
            }

            oldInPlay.complete = true;
            this.set('inPlay', oldInPlay);

            return this.get('inPlay');
        }
    });

    return PieceModel;
});
