class Game {
    constructor() {
        var mainGameObject = document.getElementById("game");
        for(var row = 0; row < 12; row++) {
            var arrayObj = {
                circles: [],
                squares: [],
            }

            var mainObj = document.createElement("div");

            var circleArrayObj = document.createElement("div");
            circleArrayObj.classList.add("allCircles");
            var squareArrayObj = document.createElement("div");
            squareArrayObj.classList.add("allSquares");

            for(var circle = 0; circle < 4; circle++) {
                var circleObj = document.createElement("div");
                circleObj.classList.add("circle");
                circleObj.objNumber = circle;
                circleObj.addEventListener("click", function() {
                    var otherObj = document.getElementById("chosenObject");
                    if(otherObj != null) otherObj.id = "";
                    game._usedHTMLObjects.allObjArray[game.currentRow].circles[this.objNumber].id = "chosenObject";
                    selectObj(this.objNumber);
                })
                circleArrayObj.appendChild(circleObj);
                arrayObj.circles.push(circleObj);
            }
            var squarePTL = document.createElement("div");
            squarePTL.classList.add("squareContainer");
            var squarePTR = document.createElement("div");
            squarePTR.classList.add("squareContainer");
            for(var square = 0; square < 4; square++) {
                var squareObj = document.createElement("div");
                squareObj.classList.add("square");
                if(square == 0 || square == 2) {
                    squarePTL.appendChild(squareObj);
                } else if(square == 1 || square == 3) {
                    squarePTR.appendChild(squareObj);
                }
                arrayObj.squares.push(squareObj);
            }
            mainObj.appendChild(circleArrayObj);
            squareArrayObj.appendChild(squarePTL);
            squareArrayObj.appendChild(squarePTR);
            mainObj.appendChild(squareArrayObj);
            mainGameObject.appendChild(mainObj);

            
            this._usedHTMLObjects.allObjArray.push(arrayObj);
        }

        var colorChooser = document.getElementById("colorChooser");
        for(var colorNumber = 0; colorNumber < this.colors.length; colorNumber++) {
            var colorObj = document.createElement("div");
            colorObj.style.backgroundColor = this.colors[colorNumber];
            colorObj.color = this.colors[colorNumber];
            colorObj.className = "circle";
            colorObj.style.display = "block";
            colorObj.addEventListener("click", function() {
                // Set color of row currentRow and at currentObj to this.color
                if(game.selectObj != undefined) {
                    game._usedHTMLObjects.allObjArray[game.currentRow].circles[game.selectObj].style.backgroundColor = this.color;
                }
            });
            colorChooser.appendChild(colorObj);
        }
        var checkColors = document.createElement("div");
        checkColors.classList.add("circle");
        checkColors.style.backgroundColor = "#FFFFFF"
        checkColors.innerHTML = "CHECK";
        checkColors.addEventListener("click", function() {
            console.log("Clicked check");
            if(!game.gameStarted) {
                game.newGame();
                return;
            }
            var continueProg = true;
            for(var i = 0; i < 4; i++) {
                if(game._usedHTMLObjects.allObjArray[game.currentRow].circles[i].style.backgroundColor == "") {
                    continueProg = false;
                }
            }
            if(continueProg) {
                game.nextLine();
            }
        });
        colorChooser.appendChild(checkColors);
    }
    nextLine() {
        var white = 0;
        var red = 0;
        var currentBlockLoc = 0;
        for(var i = 0; i < 4; i++) {
            if(this._usedHTMLObjects.allObjArray[this.currentRow].circles[i].style.backgroundColor == this.enemyColor[i]) {
                console.log("test");
                red++;
                this._usedHTMLObjects.allObjArray[this.currentRow].squares[currentBlockLoc].style.backgroundColor = "#FF0000";
                currentBlockLoc++;
            }
        }
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++) {
                if(this._usedHTMLObjects.allObjArray[this.currentRow].circles[i].style.backgroundColor == this.enemyColor[j]) {
                    white++;
                }
            }
        }
        console.log(white + " " + red);
        for(var i = 0; i <  white; i++) {
            this._usedHTMLObjects.allObjArray[this.currentRow].squares[i].style.backgroundColor = "#FFFFFF";
        }
        for(var i = 0; i < red; i++) {
            this._usedHTMLObjects.allObjArray[this.currentRow].squares[i].style.backgroundColor = "#FF0000";
        }

        this.currentRow--;
    }
    newGame() {
        console.log("Game starting");
        // Clean game, generate new colors
        this.enemyColor = [];
        for(var i = 0; i < 4; i++) {
            var newColorNumber = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.enemyColor.push(newColorNumber);
        }
        this.gameStarted = true;
    }

    gameStarted = false;
    colors = [
        "rgb(255, 0, 0)",
        "rgb(255, 255, 0)",
        "rgb(0, 255, 0)",
        "rgb(0, 255, 255)",
        "rgb(0, 0, 255)",
        "rgb(255, 0, 255)",
    ];
    enemyColor = [];

    selectedObj = undefined;
    currentRow = 11;
    _usedHTMLObjects = {
        allObjArray: [],
    }
}

function selectObj(obj) {
    game.selectObj = obj;
}