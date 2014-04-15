window.onload = function () {

    var hexagon = new irf.Sprite({
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

    var SceneHexagon = (function() {

        function SceneHexagon(parent) {
            this.parent = parent;
            this.camera = new irf.Camera({
                projection: "normal",
                vpWidth: this.parent.params.width,
                vpHeight: this.parent.params.height
            });

            this.background = new irf.Map({
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

        /* You need one of these two */
//        __extends(SceneHexagon, irf.Scene);
        SceneHexagon.prototype.update = function(delta) {
//            console.log('updating');
        };

        SceneHexagon.prototype.render = function (ctx) {
            var me = this;
            this.camera.apply(ctx, function () {
                me.background.render(ctx, me.camera);
            });
        };

        return SceneHexagon;

    })();

    var __extends = function (child, parent) {
        for (var key in parent) {
            if (parent.hasOwnProperty(key)) {
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

    var Asteroids = (function () {
        __extends(Asteroids, irf.Game);

        function Asteroids(params) {
            Asteroids.__super__.constructor.call(this, params);
            this.eventManager = new irf.EventManager;
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

    })();

    Asteroids.addScene(SceneHexagon);

    var asteroids = new Asteroids({
        "width": 800,
        "height": 600
    });

    asteroids.eventManager.on("map.finishedLoading", function () {
        asteroids.start();
    });

};
