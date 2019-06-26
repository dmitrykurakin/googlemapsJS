function initMap() {


  var initialPoint = {lat: -24.345, lng: 134.46};


  //'Perth, WA', 'Adelaide, SA'

  var originPoint = 'Perth, WA';
  var destinationPoint = 'Adelaide, SA';

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: initialPoint  // Australia.
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
    //panel: document.getElementById('right-panel')
  });

  checkThePointsAndShowTheRoute(originPoint, destinationPoint, directionsDisplay, directionsService);

//set click event to input forms
  var place0=document.getElementById('input0');
  place0.addEventListener('click', function(e){
    e.preventDefault();
    setMarker(map, 'A', initialPoint);
  }, {once:true});

  var place1=document.getElementById('input1');
  place1.addEventListener('click', function(e){
    e.preventDefault();
    setMarker(map, 'B', initialPoint);
  }, {once:true});


  //functions

  function checkThePointsAndShowTheRoute(originPoint, destinationPoint, directionsDisplay, directionsService){


    if (typeof(originPoint && destinationPoint) != 'undefined'){
      directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
      });
      displayRoute(directionsService, directionsDisplay);
    }
    else console.log('no points');
  }

  function displayRoute(service, display) {
    service.route({
      origin: originPoint,
      destination: destinationPoint,
      //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

  function setMarker(map, label, position){
    var marker = new google.maps.Marker({
      position: position,
      label: label,
      draggable: true,
      map: map
    })
  }


}
