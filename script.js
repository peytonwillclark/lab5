$(document).ready(function() {

    $("#keyboard-upper-container").hide();

        $(document).keyup(function (e) {
            if (e.keyCode === 16) {
                $("#keyboard-upper-container").hide();
                $("#keyboard-lower-container").show();
            } 
            
            $(".highlight").removeClass("highlight");
});
         $(document).keydown(function (e) {
            if (e.keyCode === 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        } 
});

var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
  var currentIndex = 0; //index in sentence
  var currentLetterIndex = 0; //tells what letters
  var numberOfMistakes = 0;
  var totalSeconds = 0;
  var mySentences = sentences[currentIndex];
  $("#sentence").append("<p>" + mySentences + "</p>");

  var currentLetter = mySentences[currentLetterIndex];
  $("#target-letter").html(currentLetter);
  $('.keyColor').removeClass("keyColor");

  $(document).keypress(function(e) {
    $('.keyColor').removeClass("keyColor");
    
    if (e.which) {
      var pressedKeycode = e.which;
      $("#" + pressedKeycode).addClass("keyColor");

      if (pressedKeycode == currentLetter.charCodeAt(0)) {
        $("#feedback").append("<span style=';color:green'>&#10004</span>");
        moveToNext();
      } else {
        $("#feedback").append("<span style='background:red;color:white'>&#x2717</span>");
        moveToNext();
        numberOfMistakes++;
        
      }

      }
  });

  function moveToNext() {
    currentLetterIndex++;

    $("#yellow-block").animate({
      marginLeft: '+=18px'
    }, 0);

    if (currentLetterIndex == mySentences.length) {
      currentIndex++;
      $("#yellow-block").animate({
        marginLeft: ''
      }, 0);

      mySentences = sentences[currentIndex];
      $("#feedback").html("");
      if (mySentences) {
        $("#sentence").html("<p>" + mySentences + "</p>");
        currentLetterIndex = 0;
      } else {
        var numberOfWords = 0;

        for (var i = 0; i < sentences.length; i++) {
          numberOfWords += sentences[i].split(" ").length;
        }

        clearInterval(timer);
       
        var score = numberOfWords / (totalSeconds / 60) - 2 * numberOfMistakes;
        $("#target-letter").html("You scored : " + Math.ceil(score));
        
        setTimeout(function() {
          var r = confirm("That's all (s)he wrote. Want to try again?");
          if (r == true) {
            location.reload();
          }
        }, 4000)

        }
    }
    currentLetter = mySentences[currentLetterIndex];
    if (currentLetter == ' ') {
      $("#target-letter").html("[space]");
    } else {
      $("#target-letter").html(currentLetter);
    }
  }
  var timer = setInterval(setTime, 1000);

  function setTime() {
    totalSeconds++;
  }
});
