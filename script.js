var WebPlayer = (function (window) {

  var webview = document.querySelector('.player'),
      timeout = 5000, // 5 seconds
      reloadKeyCode = 82, // R key
      availableButtons = ['forward', 'rewind', 'play-pause'],
      playButtonId = availableButtons[2],

      pressButton = function(id){
        webview.executeScript({
          code: 'document.querySelectorAll(\'paper-icon-button[data-id="' + id + '"]\')[0].click()'
        });
      },

      resizeWebView = function() {
        webview.style.height = document.documentElement.clientHeight + 'px';
        webview.style.width = document.documentElement.clientWidth + 'px';
      },

      keydownWebView = function(event) {
        if (event.keyCode === reloadKeyCode && (event.ctrlKey || event.metaKey)) {
          webview.reload();
        }
      },

      playFirstSong = function() {
        pressButton(playButtonId);
      },

      responseListener = function(request) {
        var button = request.command_name;

        if(~availableButtons.indexOf(button)) {
          pressButton(button);
        }
      },

      initialize = function(){
        resizeWebView();
        setTimeout(playFirstSong, timeout);
      };

  chrome.runtime.onMessage.addListener(responseListener);
  window.addEventListener('resize', resizeWebView);
  window.addEventListener('keydown', keydownWebView);

  return {
    initialize: initialize
  };
})(window);

WebPlayer.initialize();
