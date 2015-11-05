function WebPlayer() {
  var webview = document.querySelector('.player'),
      timeout = 5000,
      reloadKeyCode = 82,
      playButtonId = 'play-pause',
      availableButtons = ['forward', 'rewind', 'play-pause'];

  var pressButton = function(id){
        webview.executeScript({
          code: 'document.querySelectorAll(\'paper-icon-button[data-id="' + id + '"]\')[0].click()'
        });
      },

      resizeWebView = function() {
        webview.style.height = document.documentElement.clientHeight + 'px';
        webview.style.width = document.documentElement.clientWidth + 'px';
      },

      reloadWebView = function(event) {
        if (event.keyCode === reloadKeyCode && (event.ctrlKey || event.metaKey)) {
          webview.reload();
        }
      },

      playFirstSong = function() {
        pressButton(playButtonId);
      },

      responseListener = function(request, sender, sendResponse) {
        var button = request.command_name;

          if(availableButtons.indexOf(button) >= 0) {
            pressButton(button);
          }
      },

      initialize = function(){
        resizeWebView();
        setTimeout(playFirstSong, timeout);
      };

  chrome.runtime.onMessage.addListener(responseListener);
  window.addEventListener('resize', resizeWebView);
  window.addEventListener('keydown', reloadWebView);

  return {
    initialize: initialize
  };
}

var player = new WebPlayer();
player.initialize();
