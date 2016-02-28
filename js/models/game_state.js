define([
    'jquery',
    'underscore',
    'backbone'
    ],

    function ($, _, Backbone) {

    var GameStateModel = Backbone.Model.extend({
        defaults: function () {
            return {
                turn: 'X',
                newGame: false
            };
        },

        nextTurn: function () {
            // switch to opposite state on call

            if (this.get('turn') == 'X') {
                this.set('turn', 'O');
            }
            else {
                this.set('turn', 'X');
            }
        },

        evalGame: function (pieces) {
            // return boolean false if not over, else return winner character (eg. "X");

            var positions = pieces.get('positions'),
                winningCombos = pieces.get('winningCombos'),
                lastPlay = pieces.get('lastPlay'),
                currentPlayer = lastPlay.player,
                inc = 0,
                winningValues = [],
                possibleValues;

            // don't run if min moves to win hasn't been reached
            if (positions[currentPlayer].length < 3) {
                return false;
            }

            possibleValues = _.filter(winningCombos, function (combo) {
                                return combo.indexOf(parseInt(lastPlay.tile)) != -1;
                            });

            _.each(possibleValues, function (combo) {
                _.each(combo, function (num) {
                    if (positions[currentPlayer].indexOf(num.toString()) != -1) {
                        inc++;
                    }
                });

                if (inc === 3) {
                    // winner - filter out existing winning values and add to winning list
                    // (occurs when multiple rows cause a win simultaneously)
                    winningValues = winningValues.concat(_.difference(combo, winningValues));
                }

                inc = 0;
            });

            if (!_.isEmpty(winningValues)) {
                return {
                    'winner': currentPlayer,
                    'sequence': winningValues.join('-')
                };
            }

            // Check for tie
            if (positions.X.length + positions.O.length === 9) {
                return {
                    'winner': 'tie',
                    'sequence': '0-0-0'
                };
            }

            return false;
        }
    });

    return GameStateModel;
});
