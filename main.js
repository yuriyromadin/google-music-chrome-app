function onLoad() {
  var logo = document.querySelector('.drag');
  var webview = document.querySelector("webview");

  function updateWebviews() {
    webview.style.height = document.documentElement.clientHeight + "px";
    webview.style.width = document.documentElement.clientWidth + "px";

    window.nextSong = function(){
      webview.executeScript({
        code: 'document.querySelectorAll(\'paper-icon-button[data-id="forward"]\')[0].click()'
      });
    };
    window.prevSong = function(){
      webview.executeScript({
        code: 'document.querySelectorAll(\'paper-icon-button[data-id="rewind"]\')[0].click()'
      });
    };
    window.playSong = function(){
      webview.executeScript({
        code: 'document.querySelectorAll(\'paper-icon-button[data-id="play-pause"]\')[0].click()'
      });
    };
  }

  function responseListener(request, sender, sendResponse) {
    if (request.command_name == "next-song") {
      window.nextSong();
    } else if (request.command_name == "prev-song") {
      window.prevSong();
    } else if (request.command_name == "play-song") {
      window.playSong();
    }
  }
  window.onresize = updateWebviews;
  updateWebviews();
  chrome.runtime.onMessage.addListener(responseListener);

  setTimeout(function(){
    window.playSong();
  }, 5000);
}
onload = onLoad;
