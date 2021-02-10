const coordinates = [52.628614, 1.296345]
  const mymap = L.map('map-interactive', {minZoom: 6}).setView(coordinates, 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemctbmV0bWF0dGVycyIsImEiOiJja2tvMHk4OXMzNWltMnhxdHUwOGU2dnNoIn0.mdmi1fmPyq0QUosQKJV6xw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiemctbmV0bWF0dGVycyIsImEiOiJja2tvMHk4OXMzNWltMnhxdHUwOGU2dnNoIn0.mdmi1fmPyq0QUosQKJV6xw'
  }).addTo(mymap);

  const greenIcon = L.icon({
    iconUrl: 'assets/images/pin.svg',
    iconSize:     [40, 95],
    iconAnchor:   [20, 70],
    popupAnchor:  [1, -50]
  });

  const marker = L.marker(coordinates, {
    icon: greenIcon,
    title: 'Inspire Norolfk location'
  }).addTo(mymap).bindPopup(`
    <address style="font-style: normal;">
      <p>
        <strong>Inspire Norfolk</strong><br>
        1 Castle Meadow</br>
        Norwich<br>
        Norfolk<br>
        NR1 A99
      </p>
    </address>`);
