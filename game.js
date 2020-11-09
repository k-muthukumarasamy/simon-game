var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// when any button is clicked pick the color of the button using its ID
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkUserClick();
});

// function to play sound based on the button color
function playSound(name) {
  var audio = new Audio("sounds\\" + name + ".mp3");
  audio.play();
}

//function to animate the button that was clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//detecting the keypress to start the game
$("body").keypress(function() {
  if (gameStarted === false) {
    gameStarted = true;
    userClickedPattern = [];
    nextSequence();
  }
});

// function to progress next Level
// fix when the length of both the arrays is one and the values are differnt ; its a bug now
function checkUserClick() {
  var userClick = false;
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      userClick = true;
      console.log("gamePattern: " + gamePattern[i] + " && " + " userClickedPattern: " + userClickedPattern[i]);
    } else {
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
        // userClick = false;
        $("body").removeClass("game-over");
        var audio = new Audio("sounds\\wrong.mp3");
        audio.play();
        startOver();
      }, 200);
    }
  }
  if (userClick === true && gamePattern.length === userClickedPattern.length) {
    // console.log("inside CheckUserClick() to call nextSequence()");
    userClickedPattern = [];
    // console.log(userClickedPattern);

    setTimeout(function() {
      nextSequence();
    }, 1000);

  }
}

//function to reset the game
function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
}
