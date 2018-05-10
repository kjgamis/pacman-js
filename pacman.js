// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
}

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
}

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
}

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
}


// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde]

// Eating an inedible ghost
function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
    console.log('\nPac-Man is killed by ' + ghost.name + '!');
  }
  lifeBelowZero();
}

// Function if life is below 0
function lifeBelowZero() {
  if (lives <= 0) {
    process.exit();
    break;
  }
}

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  if (powerPellets > 0) {
    console.log('Score: ' + score + '     Lives: ' + lives + '\nPower Pellets: ' + powerPellets);
  } else {
    console.log('Score: ' + score + '     Lives: ' + lives + '\nNo Power Pellets left');
  }
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line

  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  console.log('(1) Inky');
  console.log('(2) Blinky');
  console.log('(2) Pinky');
  console.log('(2) Clyde');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatPowerPellet() {
  console.log('\nYum');
  score += 50;
  powerPellets -= 1;

  for (var i = 0; i < ghosts.length; i++) {
    ghost[i].edible = true;
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      } else {
        console.log('\nNo more Power Pellets!');
      }
      break;

    case '1':
      eatGhost(ghost[0]);
      lifeBelowZero();
      break;

    case '2':
      eatGhost(ghost[1]);
      lifeBelowZero();
      break;

    case '3':
      eatGhost(ghost[2]);
      lifeBelowZero();
      break;

    case '4':
      eatGhost(ghost[3]);
      lifeBelowZero();
      break;

    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
