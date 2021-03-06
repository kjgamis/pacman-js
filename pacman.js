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

  if (ghosts[0].edible === true) {
    console.log('(1) Inky (edible)');
  } else {
    console.log('(1) Inky (inedible)');
  }

  if (ghosts[1].edible === true) {
    console.log('(2) Blinky (edible)');
  } else {
    console.log('(2) Blinky (inedible)');
  }

  if (ghosts[2].edible === true) {
     console.log('(3) Pinky (edible)');
  } else {
    console.log('(3) Pinky (inedible)');
  }

  if (ghosts[3].edible === true) {
    console.log('(4) Clyde (edible)');
  } else {
    console.log('(4) Clyde (inedible)');
  }

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
    ghosts[i].edible = true;
  }
}

// Eating an inedible ghost
function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
  }
  lifeBelowZero();
}

// Make ghost inedible
function makeGhostsInedible() {
  ghosts.forEach(function(ghost) {
    ghost.edible = false;
  });
}

// Function if life is below 0
function lifeBelowZero() {
  if (lives <= 0) {
    console.log('\n0 lives left!');
    process.exit();
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
      eatGhost(ghosts[0]);
      lifeBelowZero();

      if (ghosts[0].edible === true) {
        score += 200;
        // ghosts[0].edible = false;
        makeGhostsInedible();
      }
      break;

    case '2':
      eatGhost(ghosts[1]);
      lifeBelowZero();

      if (ghosts[1].edible === true) {
        score += 200;
        // ghosts[1].edible = false;
        makeGhostsInedible();
      }
      break;

    case '3':
      eatGhost(ghosts[2]);
      lifeBelowZero();

      if (ghosts[2].edible === true) {
        score += 200;
        // ghosts[2].edible = false;
        makeGhostsInedible();
      }
      break;

    case '4':
      eatGhost(ghosts[3]);
      lifeBelowZero();

      if (ghosts[3].edible === true) {
        score += 200;
        // ghosts[3].edible = false;
        makeGhostsInedible();
      }
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
  console.log('\n\nGAME OVER.\n');
});
