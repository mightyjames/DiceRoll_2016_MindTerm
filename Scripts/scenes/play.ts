// PLAY SCENE
module scenes {
    export class Play extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _playLabel: objects.Label;
        private _rollButton: objects.Button;
        private _backgroundImage: createjs.Bitmap;
        private _roll: createjs.Bitmap[];
        private _rollResult;
        
        //Dices
        private _1 = 0;
        private _2 = 0;
        private _3 = 0;
        private _4 = 0;
        private _5 = 0;
        private _6 = 0;
        private _dice = "";
        //Dice label
        private _d1: objects.Label;
        private _d2: objects.Label;
        private _d3: objects.Label;
        private _d4: objects.Label;
        private _d5: objects.Label;
        private _d6: objects.Label;
        private _result:objects.Label;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {

            this._backgroundImage = new createjs.Bitmap(assets.getResult("bg"));
            this.addChild(this._backgroundImage);
            
            //Add Play Label
            this._playLabel = new objects.Label(
                "PLAY SCENE", "60px Consolas",
                "#000000",
                config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._playLabel);
            
            //Dice label
            this._result = new objects.Label("Dice", "40px Consolas", "#ff0000",
                167, 80);            
            this.addChild(this._result);
            
            //add Roll Dice
            this._rollButton = new objects.Button(
                "roll",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 180);
            this.addChild(this._rollButton);
            this._rollButton.on("click", this._rollButtonClick, this);
            
             // Initialize Array of Bitmaps 
            this._initializeBitmapArray();
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // PLAY Scene updates here
        public update(): void {

        }

        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1  ;
        }

        private _rollDice(): string[] {
            var diceLine = [" ", " "];
            var outCome = [0, 0];

            for (var spin = 0; spin < 2; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        diceLine[spin] = "1";
                        this._1++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        diceLine[spin] = "2";
                        this._2++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        diceLine[spin] = "3";
                        this._3++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        diceLine[spin] = "4";
                        this._4++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        diceLine[spin] = "5";
                        this._5++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        diceLine[spin] = "6";
                        this._6++;
                        break;
                }
            }
            return diceLine;
        }

        private _initializeBitmapArray(): void {
            this._roll = new Array<createjs.Bitmap>();
            for (var reel: number = 0; reel < 3; reel++) {
                this._roll[reel] = new createjs.Bitmap(assets.getResult("bar"));
                this._roll[reel].x = 165 + (reel * 117);
                this._roll[reel].y = 180;
                this.addChild(this._roll[reel]);
                console.log("reel" + reel + " " + this._roll[reel]);
            }
        }

        
        //EVENT HANDLERS ++++++++++++++++++++
        private _rollButtonClick(event: createjs.MouseEvent): void {
            
            console.log(this._rollDice())
            this._rollResult = this._rollDice();
           this._dice = this._rollDice[0] + " - " + this._rollDice[1];
                this._result.text = this._dice;
            /*var bitmap: string[] = this._rollDice();

            for (var reel: number = 0; reel < 2; reel++) {
                this._roll[reel].image = assets.getResult(bitmap[reel]);
            }*/
        }
    }
}