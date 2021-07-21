(function ($) {
  $('figure.audio > a').on('click', function (e) {
    e.preventDefault();
    var player = $(this).parent().find('audio')[0];
    if (player.paused == false) {
      player.pause();
    } 
    else {
        player.play();
    }
    return false;
  });
})(jQuery);