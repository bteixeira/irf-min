window.onload = function () {

    var Asteroids, EventManager, Game, Keyboard, SceneManager,
//        jQuery,
        _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) {
                    child[key] = parent[key];
                }
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

//    jQuery = require('jquery');

//    _ref = require('irf'),
    _ref = irf,
        EventManager = _ref.EventManager, Keyboard = _ref.Keyboard, SceneManager =
        _ref.SceneManager, Game = _ref.Game;

    Asteroids = (function (_super) {
        __extends(Asteroids, _super);

        function Asteroids(params) {
            Asteroids.__super__.constructor.call(this, params);
            this.eventManager = new EventManager;
            this.keyboard = new Keyboard;
            this.sceneManager.setScene("SceneHexagon", this);
        }

        Asteroids.prototype.update = function (delta) {
            Asteroids.__super__.update.call(this, delta);
            this.fps = (1000 / delta).toFixed(1);
            return this.sceneManager.currentScene.update(delta);
        };

        Asteroids.prototype.render = function () {
            Asteroids.__super__.render.call(this);
            this.sceneManager.currentScene.render(this.ctx);
            return this.ctx.fillText(this.fps, this.params.width - 50, 20);
        };

        return Asteroids;

    })(Game);

        Asteroids.addScene(SceneHexagon);

//    jQuery(function () {
    var asteroids;
    asteroids = new Asteroids({
        "width": 800,
        "height": 600
    });
    return asteroids.eventManager.on("map.finishedLoading", function () {
        return asteroids.start();
    });
//    });

//    Asteroids.addScene(require('./scenes/bigbackground.coffee'));
//
//    Asteroids.addScene(require('./scenes/height.coffee'));
//
//    Asteroids.addScene(require('./scenes/iso.coffee'));
//
//    Asteroids.addScene(require('./scenes/jumpnrun.coffee'));
//
//    Asteroids.addScene(require('./scenes/maze.coffee'));
//
//    Asteroids.addScene(require('./scenes/hexagon.coffee'));
    Asteroids.addScene(SceneHexagon);

};
