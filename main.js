var CELSIUS = true,
    button = document.getElementById('flag');
function getWeather(lat, lon, cb) {
  var key = 'http://api.wunderground.com/api/8b53e4ff83f04b08/conditions/forecast/q/';
  var url = key + lat.toString() + ',' + lon.toString() + '.json';
  console.log(url);
  var req = new XMLHttpRequest();
  req.onload = cb;
  req.open('GET', url);
  req.send(null);
}

navigator.geolocation.getCurrentPosition(function(position) {
  var coord = position.coords;
  getWeather(coord.latitude, coord.longitude, resHandler);
});

function resHandler() {
  if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    var data = JSON.parse(this.responseText);
    document.querySelector('.ciudad').innerText = data.current_observation.display_location.full;
    var icon =  document.querySelector('#weatherly').querySelector('.icon');
    icon.src = data.current_observation.icon_url;
    icon.setAttribute('alt', data.current_observation.icon);
    button.addEventListener('click', function() {
    	updateWeather(data);
		});
    updateWeather(data);
  }
}

function updateWeather(weather) {
  var wContainer = document.querySelector('.temperatura');
  console.log(weather);

  if(CELSIUS) {
    wContainer.innerText = weather.current_observation.temp_c + '°C';
    button.innerText = 'Fahrenheit';
  } else {
    wContainer.innerText = weather.current_observation.temp_f + '°F';
    button.innerText = 'Celsius';
  }

  CELSIUS = !CELSIUS;
}
