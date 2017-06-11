var defaultHost = '';

function loadOptions(){
  var userName = localStorage["BTHost"];
  if(userName == undefined){
    userName = defaultHost;
    localStorage["BTHost"] = userName;
  }

  updateEventText(localStorage["BTHost"], '');
}


function saveOptions(){
  setBannerNameTolocalStorage('BTHost');

  updateEventText(localStorage["BTHost"], "OK");
}

function setBannerNameTolocalStorage(name) {
  localStorage[name] = document.getElementById(name).value;
}

function eraseOptions(){
  localStorage["BTHost"] = defaultHost;

  location.reload();
}

function updateEventText(userName, msg){
  document.getElementById('BTHost').value = userName;

  if (msg == 'OK') { window.close(); }
}

window.addEventListener("load",function(e){
  document.getElementById("Save").addEventListener("click", saveOptions);
  loadOptions();
})
