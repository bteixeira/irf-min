window.onload = function () {

    var Camera, Map, Scene, SceneHexagon, Sprite,
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

        Scene = irf.Scene;
        Camera = irf.Camera;
        Sprite = irf.Sprite;
        Map = irf.Map;


    SceneHexagon = (function(_super) {
        __extends(SceneHexagon, _super);

        function SceneHexagon(parent) {
            var hexagon;
            this.parent = parent;
            this.camera = new Camera({
                projection: "normal",
                vpWidth: this.parent.params.width,
                vpHeight: this.parent.params.height
            });
            hexagon = new Sprite({
                "texture": "hexagon.png",
                "width": 100,
                "height": 100,
                "innerWidth": 53,
                "innerHeight": 45,
                "key": {
                    A: 0,
                    B: 1,
                    C: 2
                }
            });
            this.background = new Map({
                mapFile: {
                    width: 12,
                    height: 12,
                    0: [["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"]],
                    1: [["A"], ["B"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"]],
                    2: [["A"], ["B"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"]],
                    3: [["A"], ["B"], ["B"], ["A"], ["A"], ["A"], ["C"], ["A"], ["A"], ["A"], ["A"], ["A"]],
                    4: [["A"], ["A"], ["B"], ["A"], ["A"], ["A"], ["C"], ["C"], ["A"], ["A"], ["A"], ["A"]],
                    5: [["A"], ["A"], ["B"], ["A"], ["B"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"]],
                    6: [["A"], ["A"], ["B"], ["B"], ["A"], ["B"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"]],
                    7: [["A"], ["C"], ["A"], ["A"], ["A"], ["B"], ["A"], ["C"], ["A"], ["A"], ["A"], ["A"]],
                    8: [["C"], ["C"], ["A"], ["A"], ["B"], ["B"], ["A"], ["A"], ["B"], ["B"], ["A"], ["A"]],
                    9: [["C"], ["A"], ["A"], ["A"], ["B"], ["A"], ["A"], ["B"], ["A"], ["B"], ["A"], ["A"]],
                    10: [["A"], ["A"], ["A"], ["A"], ["B"], ["B"], ["B"], ["A"], ["A"], ["B"], ["B"], ["A"]],
                    11: [["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["A"], ["B"], ["A"]]
                },
                read: "literal",
                pattern: "simple",
                tilePlacement: "hexagon",
                sprite: hexagon,
                ed: this.parent.eventManager
            });
        }

        SceneHexagon.prototype.update = function(delta) {
        };

        SceneHexagon.prototype.render = function(ctx) {
            return this.camera.apply(ctx, (function(_this) {
                return function() {
                    _this.background.render(ctx, _this.camera);
                };
            })(this));
        };

        return SceneHexagon;

    })(Scene);

    var Asteroids, EventManager, Game, Keyboard, SceneManager,
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

    var asteroids;
    asteroids = new Asteroids({
        "width": 800,
        "height": 600
    });
    return asteroids.eventManager.on("map.finishedLoading", function () {
        return asteroids.start();
    });

};
