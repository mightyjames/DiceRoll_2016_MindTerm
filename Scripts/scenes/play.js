var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// PLAY SCENE
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function Play() {
            _super.call(this);
            //Dices
            this._1 = 0;
            this._2 = 0;
            this._3 = 0;
            this._4 = 0;
            this._5 = 0;
            this._6 = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        Play.prototype.start = function () {
            this._backgroundImage = new createjs.Bitmap(assets.getResult("bg"));
            this.addChild(this._backgroundImage);
            //Add Play Label
            this._playLabel = new objects.Label("PLAY SCENE", "60px Consolas", "#000000", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._playLabel);
            //Dice label
            /*this._d1 = new objects.Label(
                this.playerMoney.toString(),
                "14px Consolas",
                "#ff0000",
                225, 78, false);
            this._d1.textAlign = "right";
            this.addChild(this._d1);*/
            //add Roll Dice
            this._rollButton = new objects.Button("roll", config.Screen.CENTER_X, config.Screen.CENTER_Y + 180);
            this.addChild(this._rollButton);
            this._rollButton.on("click", this._rollButtonClick, this);
            // Initialize Array of Bitmaps 
            this._initializeBitmapArray();
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // PLAY Scene updates here
        Play.prototype.update = function () {
        };
        Play.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        Play.prototype._rollDice = function () {
            var diceLine = [" ", " "];
            var outCome = [0, 0];
            for (var spin = 0; spin < 2; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        diceLine[spin] = "1";
                        this._1++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        diceLine[spin] = "2";
                        this._2++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        diceLine[spin] = "3";
                        this._3++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        diceLine[spin] = "4";
                        this._4++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        diceLine[spin] = "5";
                        this._5++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        diceLine[spin] = "6";
                        this._6++;
                        break;
                }
            }
            return diceLine;
        };
        Play.prototype._initializeBitmapArray = function () {
            this._roll = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._roll[reel] = new createjs.Bitmap(assets.getResult("bar"));
                this._roll[reel].x = 165 + (reel * 117);
                this._roll[reel].y = 180;
                this.addChild(this._roll[reel]);
                console.log("reel" + reel + " " + this._roll[reel]);
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        Play.prototype._rollButtonClick = function (event) {
            console.log(this._rollDice());
            /*var bitmap: string[] = this._rollDice();

            for (var reel: number = 0; reel < 2; reel++) {
                this._roll[reel].image = assets.getResult(bitmap[reel]);
            }*/
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map