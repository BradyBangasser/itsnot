var countDownDate = new Date("Jun 9, 2022 15:15:0").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  $("#count dooku").text(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
  if (distance < 0) {
    clearInterval(x);
    $("#count dooku").text("NO MORE SCHOOL YAY");
  }
}, 1000);