require.config({

    //define paths
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        text: 'libs/require/text',
        templates: '../templates'
    },

    //required to find paths
    baseUrl: 'js'

});

require(['app'], function (App) {
    App.initialize();
});
