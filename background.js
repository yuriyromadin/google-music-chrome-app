chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 960,
      'height': 800
    },
  });
});


chrome.commands.onCommand.addListener(function(command) {
    chrome.runtime.sendMessage({
      command_name: command
    });
});
