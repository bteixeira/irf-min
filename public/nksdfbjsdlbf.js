var SceneHexagon = (function() { __extend(SceneHexagon, ...); function SceneHexagon() { } return SceneHexagon; })(Scene);

$(function() {
    var game = new irf.Game({width: 800, height: 600});
    game.eventManager = new irf.EventManager;
    game.keyboard = new irf.Keyboard;
    game.sceneManager.setScene("SceneHexagon", game);
    var updateOrig = irf.Game.prototype.update;
    game.update = function() {
        updateOrig.call(game);
        game.fps =
    }
});