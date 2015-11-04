function WebPlayer() {
  var logo = document.querySelector('.drag'),
      webview = document.querySelector("webview");

  var pressButton = function(id){
        webview.executeScript({
          code: 'document.querySelectorAll(\'paper-icon-button[data-id="' + id + '"]\')[0].click()'
        });
      },

      resizeWebView = function() {
        webview.style.height = document.documentElement.clientHeight + 'px';
        webview.style.width = document.documentElement.clientWidth + 'px';
      },

      responseListener = function(request, sender, sendResponse) {
        var button = request.command_name,
            availableButtons = ['forward', 'rewind', 'play-pause'];

        if(availableButtons.indexOf(button) >= 0){
          pressButton(button);
        }
      },

      initialize = function(){
        resizeWebView();
        setTimeout(function(){
          pressButton('play-pause');
        }, 5000);
      };

  window.onresize = resizeWebView;
  chrome.runtime.onMessage.addListener(responseListener);

  return {
    initialize: initialize
  };
}

var player = new WebPlayer();
player.initialize();
