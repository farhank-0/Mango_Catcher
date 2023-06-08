// Farhan Kassam
// 20771537 A7_enhanced

let score = 0;
let yLoc = 120;
let mangoGenerated = false;
let mangoX;
let mangoY;
let planeX = 25;
let planePositionY = 5;

function setup() {
	createCanvas(400, 200);
	background(220);
}

//Create execute function to run game
function execute() {
	background(220);
	drawHeader();
	drawPlane();
	//will only generate new mango if no other mango is on screen 
	//otherwise will call drawMango to update previous mango's x- position
	if (!mangoGenerated) {
		generateNewMango();
	} else {
		drawMango();
	}
}

function draw() {
	execute();
	//if score is -1 or less, the user loses the game and screen turns red, no new mango will be generated
	//displays lose or win text on screen and instructions to start new game
	if (score <= -1) {
		background(178, 34, 34);
		textAlign(CENTER);
		fill('white');
		text('Game Over', width / 2, height / 2 - 20);
		text('You Lose', width / 2, height / 2 - 5);
		text('Hit Spacebar to Try Again', width / 2, height / 2 + 10);
		mangoGenerated = true;
	}
	//if score is 10, the user wins the game and screen turns green, no new mango will be generated
	if (score >= 10) {
		background(0, 100, 0);
		textAlign(CENTER);
		fill('white');
		text('Game Over', width / 2, height / 2 - 20);
		text('You Win', width / 2, height / 2 - 5);
		text('Hit Spacebar to Play Again', width / 2, height / 2 + 10);
		mangoGenerated = true;

	}
}

//Draws game banner and score display
function drawHeader() {
	strokeWeight(0);
	fill(105, 105, 105);
	rect(5, 5, width - 10, height / 5);
	fill(255);
	textAlign(CENTER);
	text('Mango Catcher', 50, 20);
	text('Score:   ' + score, 310, 20);
}

//Draws plane and constrains yLoc
function drawPlane() {
	strokeWeight(0);
	fill('black');
	ellipse(planeX, yLoc + 15, 30, 10);
	yLoc = constrain(yLoc, height / 5 + 5, height - 30);
	fill(255, 127, 80);
	rect(planeX, yLoc, 5, 30);
}

//Change position of plane on y-axis with arrow keys
function keyPressed() {
	if (keyCode === UP_ARROW) {
		planeMoveUp();
	} else if (keyCode === DOWN_ARROW) {
		planeMoveDown();
	}
	//if spacebar is pressed when game is over (either lost or won) starts new game and resets score
	if (keyCode === 32 && score <= -1) {
		score = 0;
		mangoGenerated = false;
		execute();
	}
	if (keyCode === 32 && score >= 10) {
		score = 0;
		mangoGenerated = false;
		execute();
	}
}

//both functions either move plane up or down canvas
function planeMoveUp() {
	yLoc = yLoc - planePositionY;
}

function planeMoveDown() {
	yLoc = yLoc + planePositionY;
}

//will spawn a new mango on the right hand side of screen and prevent subsequent mangos until it is off screen
function generateNewMango() {
	mangoX = width;
	mangoY = random(height / 5 + 5, height);
	strokeWeight(0);
	ellipse(mangoX - 5, mangoY, 10, 5);
	mangoGenerated = true;
}

//Updates x position of previously spawned mango 
//if mango is caught by plane's rect score will increase by 1 by updateScore
//if mango is missed by plane's rect score will decrease by 1 by updateScore
//regenerates new mango
function drawMango() {
	mangoX = mangoX - 4;
	ellipse(mangoX - 5, mangoY, 10, 5);
	if (mangoX <= planeX && mangoY <= yLoc + 30 && mangoY >= yLoc) {
		updateScore(1);
		mangoGenerated = false;
	} else if (mangoX <= planeX && mangoY > yLoc + 30) {
		updateScore(-1);
		mangoGenerated = false;
	} else if (mangoX <= planeX && mangoY < yLoc) {
		updateScore(-1);
		mangoGenerated = false;
	}
}

//updates value of score
function updateScore(inc) {
	if (inc === 1) {
		score = score + 1;
	} else if (inc === -1) {
		score = score - 1;
	}
}