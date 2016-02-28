define([
    'jquery',
    'underscore',
    'backbone',
    ],

    function($, _, Backbone){

    var ScoreStateModel = Backbone.Model.extend({
        defaults: function(){
            return {
                xScore: 0,
                oScore: 0,
                tieScore: 0
            };
        },
        updateScore: function(result){
            var newVal;
            switch(result){
                case "X":
                    newVal = this.get("xScore");
                    newVal++;
                    this.set("xScore", newVal);
                    break;
                
                case "O":
                    newVal = this.get("oScore");
                    newVal++;
                    this.set("oScore", newVal);
                    break;

                case "tie":
                default:
                    newVal = this.get("tieScore");
                    newVal++;
                    this.set("tieScore", newVal);
                    break;
            }
        }
    });

    return ScoreStateModel;
});
