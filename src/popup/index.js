chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    document.querySelector('#title').innerHTML = request.source.title;
    document.querySelector('#keywords').innerHTML = request.source.keywords;
    document.querySelector('#description').innerHTML = request.source.description;
  }
});

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "/src/js/bg.js"
  }, function() {
    if (chrome.runtime.lastError) {
      document.querySelector('#errors').innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;
